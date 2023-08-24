import { mimeToFileExtension, mimes } from '@/converter/converters/mime'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Button from '../ui/button'
import TextField from '../ui/text-field'

const formats = Object.keys(mimes).map((mime) => ({
  mime,
}))

// type SidebarProps = {
//   value: FormatCategory
//   onChange: (category: FormatCategory) => void
// }

// const categories: Array<keyof typeof FormatCategory> = Object.keys(
//   FormatCategory
// ) as any

// const Sidebar = ({ value, onChange }: SidebarProps) => {
//   return (
//     <div>
//       <ul className="pr-2">
//         {categories.map((category) => (
//           <li
//             key={category}
//             className={cn('border-l-2 border-transparent', {
//               'border-sky-500': value === category,
//             })}
//           >
//             <button
//               className="py-2"
//               onClick={() => onChange(FormatCategory[category])}
//             >
//               {category}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

type SelectorProps = {
  value: string
  setValue: (format: { mime: string }) => void
}

export const Selector = ({ value, setValue }: SelectorProps) => {
  const [search, setSearch] = useState('')
  // const [category, setCategory] = useState<FormatCategory>(FormatCategory.Image)
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
      <div className="py-2 grid grid-cols-[1fr]">
        <ul className="grid gap-2 grid-cols-3">
          {formats
            .filter(
              (format) =>
                mimeToFileExtension(format.mime).includes(search) ||
                format.mime.includes(search)
            )
            .map((format) => (
              <li key={format.mime}>
                <Button
                  className={cn('rounded-md w-full', {
                    'bg-emerald-500': value === format.mime,
                  })}
                  variant="secondary"
                  size="small"
                  onPress={() => setValue(format)}
                >
                  {mimeToFileExtension(format.mime)}
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
