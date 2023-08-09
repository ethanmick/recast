import { bytesToSize } from '@/lib/file'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import Button from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Conversion } from './provider'
import { Selector } from './selector'

type ConversionListItemProps = {
  conversion: Conversion
  onConvertTo: (format: string) => void
  onRemove: () => void
}

export const ConversionListItem = ({
  conversion,
  onConvertTo,
  onRemove,
}: ConversionListItemProps) => {
  const { file, to } = conversion
  return (
    <li className="grid md:grid-cols-[48px_1fr_100px_200px_50px] grid-cols-[48px_1fr_50px_50px] items-center py-4">
      <div className="px-2">
        <Image src="/png.png" width={32} height={32} alt="PNG" />
      </div>
      <div className="md:col-span-1 col-span-1 flex flex-col">
        <span className="">{file.name}</span>
        <span className="text-xs text-neutral-500">
          {bytesToSize(file.size || 0)}
        </span>
      </div>

      <div>
        <Popover>
          <PopoverTrigger>JPG</PopoverTrigger>
          <PopoverContent>
            <Selector value={conversion.to || ''} setValue={onConvertTo} />
          </PopoverContent>
        </Popover>
      </div>
      {/* {!conversion.resultId && (
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
            <Button variant="outline" onClick={onRemove}>
              <XIcon className="w-4 h-4" />
            </Button>
          </>
        )} */}
      <div>
        <Button variant="icon" onClick={onRemove}>
          <XIcon className="w-4 h-4" />
        </Button>
      </div>
      {/* {id && <DownloadButton resultId={id} />} */}
    </li>
  )
}
