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
      <input placeholder="Search" />
      <div>
        <ul>
          {formats.map((format) => (
            <li key={format.value}>
              <button onClick={() => setValue(format.value)}>
                {format.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
