import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, forwardedRef) => {
  const { children, className, ...rest } = props
  return (
    <div
      ref={forwardedRef}
      className={cn(
        'py-1 px-2 border rounded text-xs flex justify-center items-center',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
})

Badge.displayName = 'Badge'
export default Badge
export type { BadgeProps }
