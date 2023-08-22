import { Artifact, Conversion, ConversionStatus, Stage } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { key, s3 } from '../lib/s3'
import { findPath } from './graph'

const bucket = process.env.S3_BUCKET_NAME!

type ConversionWithStagesWithArtifacts = Conversion & {
  stages: (Stage & {
    artifacts: Artifact[]
  })[]
}

const convert = async (c: ConversionWithStagesWithArtifacts) => {
  console.log(`Starting conversion ${c.id}`)
  try {
    const downloadParams = {
      Bucket: bucket,
      Key: key(c, 0, c.stages[0].artifacts[0]),
    }

    const [current, next] = c.stages
    console.log(`Downloading File`, downloadParams.Key)
    const res = await s3.getObject(downloadParams)
    console.log(`Starting conversion: ${current.mime} => ${next.mime}`)

    const converters = findPath(current.mime, next.mime)
    if (!converters) {
      console.error(
        `Could not find converter from ${current.mime} to ${next.mime}`
      )
      await prisma.conversion.update({
        where: {
          id: c.id,
        },
        data: {
          error: `Could not find converter from ${current.mime} to ${next.mime}`,
          status: ConversionStatus.ERROR,
        },
      })
      return
    }

    const converted = await res.Body?.transformToByteArray()
    if (!converted) {
      throw new Error('Could not download file')
    }
    let output: Buffer[] = []
    for (const edge of converters) {
      console.log(`Converting to ${edge.to.mime}`)
      output = await edge.converter.convert([Buffer.from(converted)])
    }

    const artifact = await prisma.artifact.create({
      data: {
        order: 0,
        stageId: next.id,
      },
    })

    console.log(`Uploading to`, artifact.id)
    const uploadParams = {
      Bucket: bucket,
      Key: key(c, 1, artifact),
      Body: output[0],
    }
    await s3.putObject(uploadParams)
    await prisma.conversion.update({
      where: {
        id: c.id,
      },
      data: {
        status: ConversionStatus.DONE,
      },
    })
  } catch (err: any) {
    await prisma.conversion.update({
      where: {
        id: c.id,
      },
      data: {
        status: ConversionStatus.ERROR,
        error: `Could not convert: ${err?.message}`,
      },
    })
  }
}

const main = async () => {
  const conversions = await prisma.conversion.findMany({
    where: {
      status: ConversionStatus.PENDING,
    },
    include: {
      stages: {
        include: {
          artifacts: true,
        },
      },
    },
  })
  console.log(`Found ${conversions.length} conversions`)
  for (const conversion of conversions) {
    await convert(conversion)
  }
}

const loop = async () => {
  while (true) {
    await main()
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

loop()
