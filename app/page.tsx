'use client'

import { Dropzone } from '@/components/dropzone'
import { FileConversion, FileManager } from '@/components/file-manager'
import { Button } from '@/components/ui/button'
import { fileExtensionToMime } from '@/lib/file'
import { useCallback, useState } from 'react'

type HeroProps = {
  open: () => void
}

const Hero = ({ open }: HeroProps) => (
  <section className="py-32 flex flex-col items-center gap-16">
    <h1 className="text-4xl font-bold text-center [text-wrap:balance]">
      Convert any file to anything.
    </h1>
    <Button variant="default" onClick={open}>
      Click to Upload
    </Button>
  </section>
)

export default function Home() {
  const [conversions, setConversions] = useState<FileConversion[]>([])
  const onDrop = useCallback((files: File[]) => {
    setConversions(files.map((file) => ({ file })))
  }, [])

  const onSubmit = async () => {
    if (!conversions.length) return

    try {
      const data = new FormData()
      data.set('file', conversions[0].file as File)
      data.set('to', fileExtensionToMime(conversions[0].to as string) as string)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())

      const { id } = await res.json()
      setConversions([{ ...conversions[0], resultId: id }])
    } catch (e: any) {
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <Dropzone onDrop={onDrop}>
      {({ open }) => (
        <main className="container mx-auto">
          <Hero open={open} />
          {conversions.length > 0 && (
            <FileManager
              conversions={conversions}
              setConversions={setConversions}
              onConvert={() => onSubmit()}
            />
          )}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, sapien vel bibendum bibendum, velit sapien bibendum sapien,
            vel bibendum sapien sapien vel sapien. Sed 0
          </p>
        </main>
      )}
    </Dropzone>
  )
}
