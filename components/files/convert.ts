'use server'

import { randomUUID } from 'crypto'
import { redirect } from 'next/navigation'

export const convert = () => {
  console.log('convert')
  const id = randomUUID()
  redirect(`/convert/${id}`)
}
