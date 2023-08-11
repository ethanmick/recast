import { fileExtensionToMime } from '@/lib/file'
import { prisma } from '@/lib/prisma'
import { s3 } from '@/lib/s3'
import { ConversionStatus } from '@prisma/client'
import { Buffer } from 'buffer'
import { randomUUID } from 'crypto'
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

  // upload the file to S3
  const key = `${randomUUID()}${randomUUID()}`.replace(/-/g, '')

  const params = {
    Bucket: bucket,
    Key: key,
    Body: buffer,
  }

  await s3.putObject(params)
  console.log(`File uploaded successfully.`)

  // save the metadata to Postgres
  const conversion = await prisma.conversion.create({
    data: {
      s3Key: key,
      fromMime: from,
      toMime: to,
      currentMime: from,
      status: ConversionStatus.PENDING,
    },
  })

  return NextResponse.json({ id: conversion.id })
}
