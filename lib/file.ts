import { extension, lookup } from 'mime-types'

export const mimeToFileExtension = (mime: string) => extension(mime)

export const fileExtensionToMime = (ext: string) => lookup(ext)
