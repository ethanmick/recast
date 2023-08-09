'use client'

import { cn, mergeProps, mergeRefs } from '@/lib/utils'
import { AriaButtonProps } from '@react-types/button'
import { VariantProps, cva } from 'class-variance-authority'
import { forwardRef, useRef } from 'react'
import { useButton, useFocusRing, useHover } from 'react-aria'

const variants = cva(
  [
    'z-0',
    'inline-flex',
    'items-center',
    'justify-center',
    'relative',
    'cursor-pointer',
    'disabled:cursor-not-allowed',
    'tracking-wide',
    'transition-[background-color,box-shadow,text-color,transform]',
    'duration-200',
    'rounded-full',
    'outline-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'font-semibold',
          'bg-emerald-500',
          'data-[hovered=true]:bg-emerald-600',
          'text-white',
          'shadow',
          'data-[hovered=true]:shadow-md',
          'disabled:bg-emerald-500/50',
          'disabled:shadow',
          'data-[focus-visible=true]:ring-emerald-500/70',
          'data-[pressed=true]:scale-[0.98]',
          'data-[focus-visible=true]:ring-2',
          'data-[focus-visible=true]:ring-offset-2',
        ],
        secondary: [
          'font-normal',
          'bg-gray-50',
          'data-[hovered=true]:bg-gray-100',
          'disabled:bg-gray-50',
          'text-gray-950',
          'shadow',
          'data-[hovered=true]:shadow-md',
          'border',
          'border-neutral-200/50',
          'data-[pressed=true]:scale-[0.98]',
          'data-[focus-visible=true]:ring-gray-200',
          'data-[focus-visible=true]:ring-2',
          'data-[focus-visible=true]:ring-offset-2',
        ],
        destructive: [
          'font-semibold',
          'bg-red-500',
          'data-[hovered=true]:bg-red-600',
          'text-white',
          'rounded-full',
          'shadow',
          'data-[hovered=true]:shadow-md',
          'disabled:bg-red-500/50',
          'disabled:shadow',
          'data-[pressed=true]:scale-[0.98]',
          'data-[focus-visible=true]:ring-red-500',
          'data-[focus-visible=true]:ring-2',
          'data-[focus-visible=true]:ring-offset-2',
        ],
        ghost: [
          'font-light',
          'text-gray-950',
          'data-[hovered=true]:text-gray-600',
          'disabled:text-gray-950',
          'data-[focus-visible=true]:ring-gray-500/30',
          'data-[focus-visible=true]:ring-1',
        ],
        icon: [
          'p-0',
          'font-light',
          'text-gray-950',
          'data-[hovered=true]:text-gray-600',
          'disabled:text-gray-950',
          'data-[focus-visible=true]:ring-gray-500/30',
          'data-[focus-visible=true]:ring-1',
        ],
        link: [
          'font-light',
          'text-emerald-500',
          'data-[hovered]:text-emerald-600',
          'data-[hovered]:underline',
          'disabled:text-emerald-500/50',
          'disabled:no-underline',
          'data-[focus-visible=true]:ring-emerald-500/30',
          'data-[focus-visible=true]:ring-1',
        ],
      },
      size: {
        small: ['text-sm', 'py-1', 'px-4'],
        default: ['text-base', 'py-2', 'px-8'],
        large: ['text-lg', 'py-3', 'px-12'],
      },
    },
    compoundVariants: [
      {
        variant: 'icon',
        size: 'small',
        className: ['p-1'],
      },
      {
        variant: 'icon',
        size: 'default',
        className: ['p-2'],
      },
      {
        variant: 'icon',
        size: 'large',
        className: ['p-4'],
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

const loading = cva(['absolute', 'inline-flex', 'items-center'], {
  variants: {
    variant: {
      primary: ['fill-white'],
      secondary: ['fill-gray-950'],
      destructive: ['fill-white'],
      ghost: ['fill-gray-950'],
      icon: ['fill-gray-950'],
      link: ['fill-emerald-500'],
    },
  },
})

const Loading = ({ variant }: VariantProps<typeof loading>) => {
  return (
    <div className={loading({ variant })}>
      <svg
        className="fill-white"
        width="60"
        height="20"
        viewBox="0 0 60 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="ease-in-out duration-[1.5s] animate-[uppydown_1.5s_ease-in-out_infinite] fill-current"
          cx="7"
          cy="16"
          r="4"
        />
        <circle
          className="ease-in-out duration-[1.5s] animate-[uppydown_1.5s_ease-in-out_infinite] [animation-delay:0.1s] fill-current"
          cx="30"
          cy="16"
          r="4"
        />
        <circle
          className="ease-in-out duration-[1.5s] animate-[uppydown_1.5s_ease-in-out_infinite] [animation-delay:0.2s] fill-current"
          cx="53"
          cy="16"
          r="4"
        />
      </svg>
    </div>
  )
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  AriaButtonProps<'button'> &
  VariantProps<typeof variants> & {
    loading?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const { children, loading, variant, size, className, disabled } = props

    const ref = useRef<HTMLButtonElement>(null)
    const { focusProps, isFocusVisible } = useFocusRing()
    const { hoverProps, isHovered } = useHover({
      ...props,
      isDisabled: disabled,
    })
    const { buttonProps, isPressed } = useButton(
      {
        ...props,
        isDisabled: props.disabled,
      },
      ref
    )

    return (
      <button
        ref={mergeRefs([ref, forwardedRef])}
        className={cn(variants({ variant, size, className }))}
        {...mergeProps(buttonProps, focusProps, hoverProps)}
        data-pressed={isPressed || undefined}
        data-hovered={isHovered || undefined}
        data-focus-visible={isFocusVisible || undefined}
      >
        {loading && <Loading variant={variant} />}
        <span
          className={cn('transition', {
            'opacity-0': loading,
            'opacity-100': !loading,
          })}
        >
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
export type { ButtonProps }
