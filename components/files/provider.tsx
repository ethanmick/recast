'use client'

import { ConversionStatus } from '@prisma/client'
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
  status: ConversionStatus
  upload?: number
}

export type ConversionContextProps = {
  dropzone: DropzoneState
  conversions: Conversion[]
  setConversions: Dispatch<SetStateAction<Conversion[]>>
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
  const [conversions, setConversions] = useState<Conversion[]>([])

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

  return (
    <FileContext.Provider value={{ dropzone, conversions, setConversions }}>
      {children}
    </FileContext.Provider>
  )
}
