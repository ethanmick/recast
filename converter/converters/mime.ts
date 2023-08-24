import Types from './mime.json'
import { Mime, MimeValue } from './types'

export const mimes: Record<Mime, MimeValue> = Types as any

export function isMime(mime: string): mime is Mime {
  return Object.prototype.hasOwnProperty.call(mimes, mime)
}

export function mimeToFileExtension(mime: string) {
  if (!isMime(mime)) throw new Error(`Unknown mime type: ${mime}`)
  return mimes[mime].extensions[0]
}

export const fileExtensionToMime = (ext: string) => {
  ext = ext.replace('.', '')
  const [mime] =
    Object.entries(mimes).find(([mime, val]) => val.extensions.includes(ext)) ??
    []
  if (!mime) throw new Error(`Unknown file extension: ${ext}`)
  return mime
}
