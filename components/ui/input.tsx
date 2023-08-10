import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { forwardRef, InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

const variants = cva([
  'box-content',
  'w-full',
  'border-none',
  'bg-transparent',
  'p-0',
  'font-medium',
  'text-slate-900',
  'outline-none',
  'placeholder:text-slate-400',
  'focus:outline-none',
  'focus:ring-0',
])

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, ...rest } = props
  return <input ref={ref} className={cn(variants({ className }))} {...rest} />
})

export default Input
export type { InputProps }
