import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { forwardRef, LabelHTMLAttributes } from 'react'

const variants = cva([
  'mb-1',
  'flex',
  'text-sm',
  'font-medium',
  'transition-colors',
  'group-focus-within:text-indigo-500',
])

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ ...props }, ref) => {
  const { className, ...rest } = props
  return <label ref={ref} className={cn(variants({ className }))} {...rest} />
})

Label.displayName = 'Label'

export default Label
export type { LabelProps }
