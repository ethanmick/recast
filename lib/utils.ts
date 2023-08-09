import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const container = (...inputs: ClassValue[]) =>
  cn('max-w-7xl md:max-w-5xl mx-auto', ...inputs)
