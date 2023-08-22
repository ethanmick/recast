import { mimeToFileExtension } from '@/lib/file'
import { prisma } from '@/lib/prisma'
import { key, s3 } from '@/lib/s3'
import { ConversionStatus } from '@prisma/client'
import archiver from 'archiver'
import { NextRequest, NextResponse } from 'next/server'

const bucket = process.env.S3_BUCKET_NAME!

type RouteParams = {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const conversion = await prisma.conversion.findUnique({
    where: {
      id: params.id,
    },
    include: {
      stages: {
        include: {
          artifacts: true,
        },
      },
    },
  })
  if (!conversion) {
    return new NextResponse(JSON.stringify({ error: 'Not found' }), {
      status: 404,
    })
  }

  // check if conversion is done
  if (conversion.status !== ConversionStatus.DONE) {
    return new NextResponse(
      JSON.stringify({ error: 'File has not finished being converted' }),
      {
        status: 400,
      }
    )
  }

  //////////////////
  const last = conversion.stages[conversion.stages.length - 1]
  if (last.artifacts.length > 1) {
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level
    })

    archive.on('warning', function (err) {
      console.warn('Warning', err)
    })

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      console.error('Warning', err)
    })

    for (const artifact of last.artifacts) {
      const downloadParams = {
        Bucket: bucket,
        Key: key(conversion, conversion.stages.length - 1, artifact),
      }

      const stream = await (
        await s3.getObject(downloadParams)
      ).Body?.transformToByteArray()
      if (!stream) {
        throw new Error('Could not get stream')
      }

      const buffer = Buffer.from(stream)
      archive.append(buffer, {
        name: `${artifact.id}.${mimeToFileExtension(last.mime)}`,
      })
    }

    archive.finalize()
    return new NextResponse(archive as any, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename=download.zip`,
      },
    })
  }

  //////////////////

  const downloadParams = {
    Bucket: bucket,
    Key: key(conversion, 1, conversion.stages[1].artifacts[0]),
  }

  const stream = (
    await s3.getObject(downloadParams)
  ).Body?.transformToWebStream()
  return new NextResponse(stream as any, {
    headers: {
      'Content-Type': conversion.stages[1].mime,
      'Content-Disposition': `attachment; filename=download.${mimeToFileExtension(
        conversion.stages[1].mime
      )}`,
    },
  })
}
