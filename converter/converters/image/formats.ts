import { Format } from '@/lib/types'

export const formats: Array<Format & { params?: string }> = [
  { mime: 'image/jpeg', ext: 'jpeg', params: undefined },
  { mime: 'image/png', ext: 'png', params: undefined },
  { mime: 'image/gif', ext: 'gif', params: undefined },
  { mime: 'image/webp', ext: 'webp', params: undefined },
  { mime: 'image/tiff', ext: 'tiff', params: undefined },
  { mime: 'image/bmp', ext: 'bmp', params: undefined },
  { mime: 'image/heic', ext: 'heic', params: undefined },
  { mime: 'image/heif', ext: 'heif', params: undefined },
  { mime: 'image/x-icon', ext: 'ico', params: '-resize 256x256' },
]
