'use client'

import { bytesToSize } from '@/lib/file'
import { Format } from '@/lib/types'
import { ConversionStatus } from '@prisma/client'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { DownloadButton } from '../download-button'
import Badge from '../ui/badge'
import Button from '../ui/button'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Conversion, UXConversionStatus } from './provider'
import { Selector } from './selector'

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json())

type ConversionListItemProps = {
  conversion: Conversion
  onConvertTo: (format: Format) => void
  onRemove: () => void
  onUpdate: (conversion: Partial<Conversion>) => void
}

export const ConversionListItem = ({
  conversion,
  onConvertTo,
  onRemove,
  onUpdate,
}: ConversionListItemProps) => {
  const { data } = useSWR(
    () =>
      conversion.id && conversion.status != UXConversionStatus.Complete
        ? `/api/status/${conversion.id}`
        : null,
    fetcher,
    { refreshInterval: 1000 }
  )

  useEffect(() => {
    if (data?.status === ConversionStatus.DONE) {
      onUpdate({
        status: UXConversionStatus.Complete,
      })
    }
  }, [data?.status])

  const [open, setOpen] = useState(false)
  const { file, to } = conversion

  return (
    <li className="grid md:grid-cols-[32px_minmax(0,1fr)_80px_100px_32px] grid-cols-[32px_minmax(0,max-content)_80px_67px_32px] items-center py-4 gap-2">
      <div className="">
        <Image src="/png.png" width={32} height={32} alt="PNG" />
      </div>
      <div className="md:col-span-1 col-span-1 flex flex-col">
        <span className="whitespace-nowrap overflow-hidden text-ellipsis">
          {file.name}
        </span>
        <span className="text-xs text-neutral-500">
          {bytesToSize(file.size || 0)}
        </span>
      </div>
      {conversion.status === UXConversionStatus.Pending && (
        <Badge className="text-nuetral-700">Pending</Badge>
      )}
      {conversion.status === UXConversionStatus.Uploading && (
        <Badge className="text-sky-500 border-sky-500">
          {(conversion.upload || 0) * 100}%
        </Badge>
      )}
      {conversion.status === UXConversionStatus.Processing && (
        <Badge className="text-sky-500 border-sky-500">Converting</Badge>
      )}
      {conversion.status === UXConversionStatus.Error && (
        <Badge className="text-red-500 border-red-500">Error</Badge>
      )}
      {conversion.status === UXConversionStatus.Complete && (
        <Badge className="text-green-500 border-green-500">Done</Badge>
      )}
      {conversion.status != UXConversionStatus.Complete && (
        <>
          <div className="hidden md:flex justify-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={conversion.status !== UXConversionStatus.Pending}
                  size="small"
                  className="px-2"
                  variant={conversion.error ? 'destructive' : 'secondary'}
                >
                  {conversion.to?.ext || 'Convert To'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Selector
                  value={conversion.to?.mime || ''}
                  setValue={onConvertTo}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="md:hidden">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="small" className="px-2" variant="secondary">
                  {conversion.to?.ext || 'Format'}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100%-2rem)]">
                <div className="font-semibold text-lg">
                  Convert to which format?
                </div>
                <Selector
                  value={conversion.to?.mime || ''}
                  setValue={(v) => {
                    onConvertTo(v)
                    setOpen(false)
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
      {conversion.status === UXConversionStatus.Complete && (
        <div className="flex justify-center col-span-2">
          <DownloadButton id={conversion.id || ''} />
        </div>
      )}
      {conversion.status != UXConversionStatus.Complete && (
        <div className="flex justify-end items-center">
          <Button variant="icon" onClick={onRemove}>
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
      )}
    </li>
  )
}
