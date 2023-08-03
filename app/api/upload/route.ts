import { prisma } from '@/lib/prisma'
import { ConversionStatus } from '@prisma/client'
import * as AWS from 'aws-sdk'
import { Buffer } from 'buffer'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
})

const bucket = process.env.S3_BUCKET_NAME!

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File
  const to = data.get('to') as string
  const from = file.type

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
  const key = `${uuid()}${uuid}`.replace(/-/g, '')
  const s3 = new AWS.S3()

  const params = {
    Bucket: bucket,
    Key: key,
    Body: buffer,
  }

  const uploadResponse = await s3.upload(params).promise()
  console.log(`File uploaded successfully. ${uploadResponse.Location}`)

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
