'use client'

import { fileExtensionToMime } from '@/lib/file'
import axios from 'axios'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { DropzoneState, useDropzone as useCreateDropzone } from 'react-dropzone'

export enum UXConversionStatus {
  Pending,
  Uploading,
  Processing,
  Complete,
  Error,
}

export type Conversion = {
  id?: string
  file: File
  to?: string
  status: UXConversionStatus
  upload?: number
  error?: any
}

export type ConversionContextProps = {
  dropzone: DropzoneState
  conversions: Conversion[]
  setConversions: Dispatch<SetStateAction<Conversion[]>>
  removeConversion: (index: number) => void
  updateConversion: (index: number, conversion: Partial<Conversion>) => void
  convert: () => Promise<void>
}

const ConversionContext = createContext<ConversionContextProps>(
  {} as unknown as ConversionContextProps
)

type Props = {
  children: React.ReactNode
}

export const useConversions = () => useContext(ConversionContext)
export const useDropzone = () => useContext(ConversionContext).dropzone

export const ConversionProvider = ({ children }: Props) => {
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
        status: UXConversionStatus.Pending,
      })),
    ])
  }, [])

  const dropzone = useCreateDropzone({ onDrop, noClick: true })

  const convert = async () => {
    for (let i = 0; i < conversions.length; i++) {
      const c = conversions[i]
      updateConversion(i, { status: UXConversionStatus.Uploading })
      try {
        const formData = new FormData()
        formData.append('file', c.file)
        formData.append('to', fileExtensionToMime(c.to || '') as string)

        const { data } = await axios.postForm('/api/upload', formData, {
          onUploadProgress: ({ progress }) => {
            updateConversion(i, { upload: progress })
          },
        })
        const { id } = data
        updateConversion(i, { status: UXConversionStatus.Processing, id })

        let done = false
        do {
          const { data } = await axios.get(`/api/status/${id}`)
          done = data.status === 'DONE'
          updateConversion(i, {
            status:
              data.status === 'DONE'
                ? UXConversionStatus.Complete
                : UXConversionStatus.Processing,
          })
          await new Promise((resolve) => setTimeout(resolve, 1000))
        } while (!done)
      } catch (err: any) {
        updateConversion(i, { status: UXConversionStatus.Error, error: err })
      }
    }
  }

  return (
    <ConversionContext.Provider
      value={{
        convert,
        dropzone,
        conversions,
        setConversions,
        updateConversion,
        removeConversion,
      }}
    >
      {children}
    </ConversionContext.Provider>
  )
}
