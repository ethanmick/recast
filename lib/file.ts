import { extension, lookup } from 'mime-types'

const _mimes: Record<string, string> = {
  'image/vnd.microsoft.icon': 'image/x-icon',
}

export const mimeToFileExtension = (mime: string) => {
  const ext = extension(mime)
  if (!ext) throw new Error(`Unknown mime type: ${mime}`)
  return ext
}

export const fileExtensionToMime = (ext: string) => {
  const mime = lookup(ext)
  if (!mime) throw new Error(`Unknown file extension: ${ext}`)
  return _mimes[mime] || mime
}

export function bytesToSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes == 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())

  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}
