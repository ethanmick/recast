'use client'

import { bytesToSize } from '@/lib/file'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import Button from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
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
  const [open, setOpen] = useState(false)
  const { file, to } = conversion
  return (
    <li className="grid md:grid-cols-[48px_1fr_100px_200px_50px] grid-cols-[48px_1fr_80px_50px] items-center py-4">
      <div className="px-2">
        <Image src="/png.png" width={32} height={32} alt="PNG" />
      </div>
      <div className="md:col-span-1 col-span-1 flex flex-col">
        <span className="">{file.name}</span>
        <span className="text-xs text-neutral-500">
          {bytesToSize(file.size || 0)}
        </span>
      </div>
      <div className="hidden md:block">
        <Popover>
          <PopoverTrigger>{conversion.to || 'To'}</PopoverTrigger>
          <PopoverContent>
            <Selector value={conversion.to || ''} setValue={onConvertTo} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="md:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="px-2" variant="secondary">
              {conversion.to || 'Format'}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100%-2rem)]">
            <div className="font-semibold text-lg">
              Convert to which format?
            </div>
            <Selector
              value={conversion.to || ''}
              setValue={(v) => {
                onConvertTo(v)
                setOpen(false)
              }}
            />
          </DialogContent>
        </Dialog>
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
