import { Converter } from '../converter'
import { Mime } from '../types'
import { ImageMagickConverter } from './converter'

const edges: Array<Converter> = []

// The following edges form a fully connected graph

const fullEdges: Mime[] = [
  'image/bmp',
  'image/gif',
  'image/heic',
  'image/heif',
  'image/jp2',
  'image/jpeg',
  'image/jpm',
  'image/jpx',
  'image/jxl',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/vnd.adobe.photoshop',
  'image/webp',
]

for (const from of fullEdges) {
  for (const to of fullEdges) {
    if (from !== to) {
      edges.push(new ImageMagickConverter({ mime: from }, { mime: to }))
    }
  }
}

const ico = {
  options: {
    outputs: '-resize 256x256',
  },
}

for (const mime of fullEdges) {
  edges.push(new ImageMagickConverter({ mime }, { mime: 'image/x-icon', ...ico }))
  edges.push(new ImageMagickConverter({ mime: 'image/x-icon' }, { mime }))
}

export default edges
