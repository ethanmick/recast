import { S3 } from '@aws-sdk/client-s3'
import { Artifact, Conversion } from '@prisma/client'

export const s3 = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_DEFAULT_REGION,
})

export const key = (c: Conversion, n: number, a: Artifact) =>
  `/${c.id}/${n}/${a.id}`
