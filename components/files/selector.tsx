import { formats } from '@/converter/converters/formats'
import { Format } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Button from '../ui/button'
import TextField from '../ui/text-field'

type SelectorProps = {
  value: string
  setValue: (format: Format) => void
}

export const Selector = ({ value, setValue }: SelectorProps) => {
  const [search, setSearch] = useState('')
  return (
    <div>
      <TextField
        aria-label="Search for a format"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => {
          setSearch(e as string)
        }}
      />
      <div className="py-2">
        <ul className="grid gap-2 grid-cols-3">
          {formats
            .filter(
              (format) =>
                format.ext.includes(search) || format.mime.includes(search)
            )
            .map((format) => (
              <li key={format.mime}>
                <Button
                  className={cn({
                    'bg-emerald-500': value === format.mime,
                  })}
                  variant="secondary"
                  size="small"
                  onPress={() => setValue(format)}
                >
                  {format.ext}
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
