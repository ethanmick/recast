import { Conversion, ConversionStatus } from '@prisma/client'
import { randomUUID } from 'crypto'
import { extension } from 'mime-types'
import { prisma } from '../lib/prisma'
import { s3 } from '../lib/s3'
import { findPath } from './graph'

const bucket = process.env.S3_BUCKET_NAME!

const convert = async (c: Conversion) => {
  try {
    const downloadParams = {
      Bucket: bucket,
      Key: c.s3Key,
    }
    console.log(`Downloading File`, downloadParams)
    const res = await s3.getObject(downloadParams)
    console.log('Converting File', c.fromMime, c.toMime)

    const converters = findPath(c.fromMime, c.toMime)
    if (!converters) {
      console.error(
        `Could not find converters for ${c.fromMime} to ${c.toMime}`
      )
      await prisma.conversion.update({
        where: {
          id: c.id,
        },
        data: {
          error: `Could not convert from ${c.fromMime} to ${c.toMime}`,
          status: ConversionStatus.ERROR,
        },
      })
      return
    }

    const converted = await res.Body?.transformToByteArray()
    if (!converted) {
      throw new Error('Could not download file')
    }
    let buf = Buffer.from(converted)
    for (const edge of converters) {
      buf = await edge.converter(buf)
    }

    console.log('Lookup', converters[converters.length - 1].to.type)
    const mime = extension(converters[converters.length - 1].to.type) as string

    const key = (randomUUID() + randomUUID()).replace(/-/g, '')
    console.log(`Uploading to`, key)
    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: buf,
    }
    await s3.putObject(uploadParams)
    await prisma.conversion.update({
      where: {
        id: c.id,
      },
      data: {
        status: ConversionStatus.DONE,
        s3Key: key,
        currentMime: mime,
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
