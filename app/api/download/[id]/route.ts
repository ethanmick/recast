import { prisma } from '@/lib/prisma'
import { s3 } from '@/lib/s3'
import { ConversionStatus } from '@prisma/client'
import { extension } from 'mime-types'
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

  const downloadParams = {
    Bucket: bucket,
    Key: conversion.s3Key,
  }

  const stream = (
    await s3.getObject(downloadParams)
  ).Body?.transformToWebStream()
  return new NextResponse(stream as any, {
    headers: {
      'Content-Type': conversion.toMime,
      'Content-Disposition': `attachment; filename=download.${extension(
        conversion.toMime
      )}`,
    },
  })
}
