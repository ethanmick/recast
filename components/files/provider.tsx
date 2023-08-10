'use client'

import { ConversionStatus } from '@prisma/client'
import { useRouter } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { DropzoneState, useDropzone as useCreateDropzone } from 'react-dropzone'

export type Conversion = {
  id?: string
  file: File
  to?: string
  status: ConversionStatus
  upload?: number
}

export type ConversionContextProps = {
  dropzone: DropzoneState
  conversions: Conversion[]
  setConversions: Dispatch<SetStateAction<Conversion[]>>
  removeConversion: (index: number) => void
  updateConversion: (index: number, conversion: Partial<Conversion>) => void
}

const FileContext = createContext<ConversionContextProps>(
  {} as unknown as ConversionContextProps
)

type Props = {
  children: React.ReactNode
}

export const useConversions = () => useContext(FileContext)
export const useDropzone = () => useContext(FileContext).dropzone

export const ConversionProvider = ({ children }: Props) => {
  const router = useRouter()
  const [conversions, setConversions] = useState<Conversion[]>([])

  const removeConversion = (index: number) => {
    setConversions((conversions) => [
      ...conversions.slice(0, index),
      ...conversions.slice(index + 1),
    ])
  }

  const updateConversion = (index: number, conversion: Partial<Conversion>) => {
    setConversions((conversions) => [
      ...conversions.slice(0, index),
      { ...conversions[index], ...conversion },
      ...conversions.slice(index + 1),
    ])
  }

  const onDrop = useCallback((files: File[]) => {
    setConversions((conversions) => [
      ...conversions,
      ...files.map((file) => ({
        file,
        status: ConversionStatus.PENDING,
      })),
    ])
  }, [])

  const dropzone = useCreateDropzone({ onDrop, noClick: true })

  const convert = async () => {
    router.push(`/convert/${'id_123'}`)

    // try {
    //   const formData = new FormData()
    //   conversions.forEach((conversion) => {
    //     formData.append('files', conversion.file)
    //   })
    //   const res = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   if (!res.ok) throw new Error('Failed to upload')
    //   const data = await res.json()
    // } catch (err: any) {}
  }

  return (
    <FileContext.Provider
      value={{
        dropzone,
        conversions,
        setConversions,
        updateConversion,
        removeConversion,
      }}
    >
      {children}
    </FileContext.Provider>
  )
}
