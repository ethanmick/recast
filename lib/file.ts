import { extension, lookup } from 'mime-types'

export const mimeToFileExtension = (mime: string) => extension(mime)

export const fileExtensionToMime = (ext: string) => lookup(ext)

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes == 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())

  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}
