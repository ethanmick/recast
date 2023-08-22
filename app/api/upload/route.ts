import { fileExtensionToMime } from '@/lib/file'
import { prisma } from '@/lib/prisma'
import { key, s3 } from '@/lib/s3'
import { ConversionStatus } from '@prisma/client'
import { Buffer } from 'buffer'
import { NextRequest, NextResponse } from 'next/server'

const bucket = process.env.S3_BUCKET_NAME!

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File
  const to = data.get('to') as string
  const from = fileExtensionToMime(file.name)

  if (!file) {
    return new NextResponse(JSON.stringify({ error: 'No file found' }), {
      status: 400,
    })
  }

  if (!to) {
    return new NextResponse(JSON.stringify({ error: 'No "to" found' }), {
      status: 400,
    })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const conversion = await prisma.conversion.create({
    data: {
      currentStage: 0,
      status: ConversionStatus.UPLOADING,
      stages: {
        create: [
          {
            mime: from,
            order: 0,
            artifacts: {
              create: [
                {
                  order: 0,
                },
              ],
            },
          },
          {
            mime: to,
            order: 1,
          },
        ],
      },
    },
    include: {
      stages: {
        include: {
          artifacts: true,
        },
      },
    },
  })

  const params = {
    Bucket: bucket,
    Key: key(conversion, 0, conversion.stages[0].artifacts[0]),
    Body: buffer,
  }

  await s3.putObject(params)
  console.log(`File uploaded successfully.`, params.Key)

  await prisma.conversion.update({
    where: {
      id: conversion.id,
    },
    data: {
      status: ConversionStatus.PENDING,
    },
  })

  return NextResponse.json({ id: conversion.id })
}
