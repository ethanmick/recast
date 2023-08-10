'use client'

import { Button } from '@nextui-org/button'
import { Link } from '@nextui-org/link'

type Props = {
  id: string
}

export const DownloadButton = ({ id }: Props) => {
  return (
    <Button as={Link} color="success" href={`/api/download/${id}`}>
      Download
    </Button>
  )
}
