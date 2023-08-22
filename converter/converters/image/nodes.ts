import { MimeNode } from '@/converter/types'

const nodes: MimeNode[] = []

// JPEG, JPG
const IMAGE_JPEG: MimeNode = {
  mime: 'image/jpeg',
}
nodes.push(IMAGE_JPEG)

// PNG
const IMAGE_PNG: MimeNode = {
  mime: 'image/png',
}
nodes.push(IMAGE_PNG)

// GIF
const IMAGE_GIF: MimeNode = {
  mime: 'image/gif',
}
nodes.push(IMAGE_GIF)

// BMP
const IMAGE_BMP: MimeNode = {
  mime: 'image/bmp',
}
nodes.push(IMAGE_BMP)

// TIFF
const IMAGE_TIFF: MimeNode = {
  mime: 'image/tiff',
}
nodes.push(IMAGE_TIFF)

// RAW??
// const IMAGE_TIFF: MimeNode = {
//   mime: 'image/tiff',
// }
// nodes.push(IMAGE_TIFF)

// PSD
const IMAGE_VND_ADOBE_PHOTOSHOP: MimeNode = {
  mime: 'image/vnd.adobe.photoshop',
}
nodes.push(IMAGE_VND_ADOBE_PHOTOSHOP)

// SVG
const IMAGE_SVG_XML: MimeNode = {
  mime: 'image/svg+xml',
}
nodes.push(IMAGE_SVG_XML)

// webp
const IMAGE_WEBP: MimeNode = {
  mime: 'image/webp',
}
nodes.push(IMAGE_WEBP)

// heif
const IMAGE_HEIF: MimeNode = {
  mime: 'image/heif',
}
nodes.push(IMAGE_HEIF)

// heic
const IMAGE_HEIC: MimeNode = {
  mime: 'image/heic',
}
nodes.push(IMAGE_HEIC)

// ICO
const IMAGE_X_ICON: MimeNode = {
  mime: 'image/x-icon',
  options: {
    outputs: '-resize 256x256',
  },
}
nodes.push(IMAGE_X_ICON)

// jp2
const IMAGE_JP2: MimeNode = {
  mime: 'image/jp2',
}
nodes.push(IMAGE_JP2)
nodes.push({
  mime: 'image/jpx',
})
nodes.push({
  mime: 'image/jpm',
})

// // jxl
// const IMAGE_JXL: MimeNode = {
//   mime: 'image/jxl',
// }
// nodes.push(IMAGE_JXL)

// PDF
const APPLICATION_PDF: MimeNode = {
  mime: 'application/pdf',
}
nodes.push(APPLICATION_PDF)

export { nodes }
