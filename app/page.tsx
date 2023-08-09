'use client'

import { Dropzone } from '@/components/dropzone'
import { FileConversion, FileManager } from '@/components/file-manager'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { fileExtensionToMime } from '@/lib/file'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'

const HeroBackground = dynamic(() => import('./hero'), {
  ssr: false,
})

type HeroProps = {
  open: () => void
}

const Hero = ({ open }: HeroProps) => (
  <section className="py-32 flex flex-col items-center gap-16">
    <h1 className="text-7xl font-bold text-center [text-wrap:balance]">
      Convert any file to{' '}
      <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-sky-500 animate-text">
        anything
      </span>
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
    <>
      <HeroBackground />
      <Dropzone onDrop={onDrop}>
        {({ open }) => (
          <>
            <Header />
            <main>
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
                euismod, sapien vel bibendum bibendum, velit sapien bibendum
                sapien, vel bibendum sapien sapien vel sapien. Sed 0
              </p>
              <section className="flex-col flex gap-[30rem]">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  aliquet nulla a dui pharetra, nec viverra nisl sollicitudin.
                  Fusce ac orci non nunc tristique tincidunt. Etiam euismod,
                  felis eu gravida sollicitudin, erat est dictum lectus, id
                  iaculis justo enim nec erat. Nunc nec bibendum nunc. Proin sed
                  nisi quis augue tincidunt scelerisque eu a quam. Vestibulum
                  quis neque eget felis suscipit pellentesque non non dui.
                </p>
                <p>
                  Vivamus et neque eu dui facilisis dapibus. Nullam bibendum id
                  libero at bibendum. Mauris a ligula nec turpis tincidunt
                  vestibulum. Phasellus id metus dolor. Maecenas vel neque ut
                  nisi porttitor scelerisque. Mauris in felis vel nisl laoreet
                  egestas nec at ligula. Sed sed eros quis enim varius
                  fermentum. Vestibulum ante ipsum primis in faucibus orci
                  luctus et ultrices posuere cubilia curae; Proin sagittis erat
                  in nisl aliquet, sit amet iaculis purus bibendum.
                </p>
                <p>
                  Cras sed sem sed diam ullamcorper commodo a nec erat. In hac
                  habitasse platea dictumst. Sed sit amet mollis tortor. Vivamus
                  in tellus a sapien fermentum auctor id quis justo. Sed in quam
                  vel ex congue faucibus sit amet non dui. Proin mollis neque
                  nec diam malesuada, et condimentum libero ultrices. Morbi eu
                  orci vel lectus facilisis pellentesque.
                </p>
              </section>
            </main>
          </>
        )}
      </Dropzone>
    </>
  )
}
