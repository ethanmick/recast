import { cn } from '@/lib/utils'
import Button from '../ui/button'
import TextField from '../ui/text-field'

const formats = [
  { value: 'png', label: 'png' },
  { value: 'webp', label: 'webp' },
  { value: 'tiff', label: 'tiff' },
]

type SelectorProps = {
  value: string
  setValue: (value: string) => void
}

export const Selector = ({ value, setValue }: SelectorProps) => {
  return (
    <div>
      <TextField placeholder="Search" />
      <div className="py-2">
        <ul className="grid gap-2 grid-cols-3">
          {formats.map((format) => (
            <li key={format.value}>
              <Button
                className={cn({
                  'bg-emerald-500': value === format.value,
                })}
                variant="secondary"
                onPress={() => setValue(format.value)}
              >
                {format.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
