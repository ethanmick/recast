import { bytesToSize } from '@/lib/file'
import { trackGoal } from 'fathom-client'
import { FileImageIcon, XIcon } from 'lucide-react'
import { Combobox } from './combobox'
import { DownloadButton } from './download-button'
import { Button } from './ui/button'

export type FileConversion = {
  file?: File
  to?: string
  resultId?: string
}

type FileManagerProps = {
  conversions: FileConversion[]
  setConversions: (conversions: FileConversion[]) => void
  onConvert: (conversion: FileConversion) => void
}

export const FileManager = ({
  conversions,
  setConversions,
  onConvert,
}: FileManagerProps) => {
  return (
    <div>
      <ul className="border rounded-md p-4">
        {conversions.map((conversion, key) => (
          <li
            key={key}
            className="grid md:grid-cols-[48px_minmax(300px,_1fr)_100px_200px_50px] grid-cols-5 items-center py-4"
          >
            <div className="px-2">
              <FileImageIcon className="w-8 h-8" />
            </div>
            <div className="md:col-span-1 col-span-3">
              <span className="font-mono bg-neutral-100 rounded p-2">
                {conversion.file?.name}
              </span>
            </div>
            <span className="px-2">
              {bytesToSize(conversion.file?.size || 0)}
            </span>
            {!conversion.resultId && (
              <>
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
                <Button
                  variant="outline"
                  onClick={() => {
                    setConversions([...conversions].filter((c, i) => i !== key))
                  }}
                >
                  <XIcon className="w-4 h-4" />
                </Button>
              </>
            )}
            {conversion.resultId && (
              <DownloadButton resultId={conversion.resultId} />
            )}
          </li>
        ))}
      </ul>
      <div className="flex justify-end py-2">
        <Button
          variant="default"
          onClick={() => {
            trackGoal('DVXJLASL', 0)
            onConvert(conversions[0])
          }}
        ></Button>
      </div>
    </div>
  )
}
