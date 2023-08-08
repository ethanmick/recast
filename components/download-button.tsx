'use client'

import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'
import { ConversionStatus } from '@prisma/client'
import { useEffect, useState } from 'react'

type Props = {
  resultId: string
}

export const DownloadButton = ({ resultId }: Props) => {
  const [status, setStatus] = useState<ConversionStatus>(
    ConversionStatus.PENDING
  )
  async function refresh() {
    try {
      const res = await fetch('/api/status/' + resultId)
      const { status } = await res.json()
      setStatus(status)
    } catch (err: any) {}
  }

  useEffect(() => {
    const tick = setInterval(refresh, 1000)
    return () => clearInterval(tick)
  }, [])

  return (
    <Button
      as={Link}
      color="success"
      isDisabled={status != ConversionStatus.DONE}
      href={`/api/download/${resultId}`}
    >
      Download
    </Button>
  )
}
