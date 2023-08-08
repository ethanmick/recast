'use client'

import { useDropzone } from 'react-dropzone'
import { Combobox } from './combobox'
import { Button } from './ui/button'

type Props = {
  children: React.ReactNode
  onDrop: (files: File[]) => void
}

export function PageDropzone({ children, onDrop }: Props) {
  const {
    open,
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, noClick: true })

  const className = [isDragActive && 'border border-blue-500']
    .filter(Boolean)
    .join(' ')

  return (
    <div {...getRootProps({ className })}>
      <Button color="primary" onClick={open}>
        Click to Upload
      </Button>
    </div>
  )
}

export type FileConversion = {
  file?: File
  to?: string
  resultId?: string
}

type StagedFilesProps = {
  conversions: FileConversion[]
  setConversions: (conversions: FileConversion[]) => void
  onConvert: (conversion: FileConversion) => void
}

export const StagedFiles = ({
  conversions,
  setConversions,
  onConvert,
}: StagedFilesProps) => {
  return (
    <ul className="border rounded-md p-4">
      {conversions.map((conversion, key) => (
        <li key={key} className="flex gap-4 items-center">
          <div>
            {conversion.file?.name} - {conversion.file?.size} bytes -{' '}
            {conversion.file?.type}
          </div>
          <Combobox
            value={conversion.to || ''}
            setValue={(v) =>
              setConversions(
                [...conversions].map((c, i) =>
                  i === key ? { ...c, to: v } : c
                )
              )
            }
          />
          <span className="flex-grow" />
          {conversion.resultId ? (
            <a href={`/api/download/${conversion.resultId}`}>Download</a>
          ) : (
            <Button variant="default" onClick={() => onConvert(conversion)}>
              Convert
            </Button>
          )}
        </li>
      ))}
    </ul>
  )
}
