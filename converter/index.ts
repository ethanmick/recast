import { Conversion, ConversionStatus } from '@prisma/client'
import * as AWS from 'aws-sdk'
import { randomUUID } from 'crypto'
import { lookup } from 'mime-types'
import { prisma } from '../lib/prisma'
import { PNG_TO_JPG } from './converters/image'

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
})

const bucket = process.env.S3_BUCKET_NAME!

const convert = async (c: Conversion) => {
  const s3 = new AWS.S3()
  const downloadParams = {
    Bucket: bucket,
    Key: c.s3Key,
  }
  console.log(`Downloading File`, downloadParams)
  const res = await s3.getObject(downloadParams).promise()
  const converted = await PNG_TO_JPG(res.Body as Buffer)
  const key = (randomUUID() + randomUUID()).replace(/-/g, '')
  console.log(`Uploading to`, key)
  const uploadParams = {
    Bucket: bucket,
    Key: key,
    Body: converted,
  }
  await s3.upload(uploadParams).promise()
  await prisma.conversion.update({
    where: {
      id: c.id,
    },
    data: {
      status: ConversionStatus.DONE,
      s3Key: key,
      currentMime: lookup('jpg') as string,
    },
  })
}

const main = async () => {
  const conversions = await prisma.conversion.findMany({
    where: {
      status: ConversionStatus.PENDING,
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
