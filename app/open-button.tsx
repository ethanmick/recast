'use client'

import { useDropzone } from '@/components/files/provider'
import Button from '@/components/ui/button'

export const OpenButton = () => {
  const { open } = useDropzone()
  return (
    <Button className="bg-emerald-500" size="large" onClick={open}>
      Select a file to convert
    </Button>
  )
}
