import { readFile } from 'fs/promises'
import { join } from 'path'
import { Converter } from '../converter'
import { ImageMagickConverter } from './converter'

const noop = () => {}

describe('JPG to PNG Converter', () => {
  let converter: Converter
  let buffer: Buffer

  beforeAll(async () => {
    converter = new ImageMagickConverter(
      { mime: 'image/jpeg' },
      { mime: 'image/png' }
    )
    converter.log = noop
    buffer = await readFile(join(__dirname, 'test.jpg'))
  })

  test.each([
    'image/bmp',
    'image/gif',
    'image/heic',
    'image/heif',
    'image/jp2',
    'image/jpm',
    'image/jpx',
    'image/jxl',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/vnd.adobe.photoshop',
    'image/webp',
  ])(`image/jpg => %s`, async (mime: any) => {
    const converter = new ImageMagickConverter({ mime: 'image/jpeg' }, { mime })
    converter.log = noop
    const [result] = await converter.convert([buffer])
    expect(result).toBeDefined()
  })

  it('should convert "example.jpg" to PNG format', async () => {
    const [pngBuffer] = await converter.convert([buffer])
    const pngMagicNumbers = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]) // PNG file signature
    expect(pngBuffer.slice(0, 8)).toEqual(pngMagicNumbers)
  })

  it('should convert to SVG', async () => {
    converter = new ImageMagickConverter(
      { mime: 'image/jpeg' },
      { mime: 'image/svg+xml' }
    )
    converter.log = noop
    const [svg] = await converter.convert([buffer])
    expect(svg.toString()).toContain('<svg')
  })
})

// describe('PDF to JPG Converter', () => {
//   let converter: Converter

//   beforeAll(() => {
//     converter = new PdfToConverter({ mime: 'image/jpeg' })
//   })

//   it('should convert "test.pdf" to JPG format', async () => {
//     // Read the PDF file
//     const pdfBuffer = await readFile(join(__dirname, 'test.pdf'))

//     // Use the converter
//     const results = await converter.convert([pdfBuffer])

//     // Check the resulting buffer to see if it has the JPG magic numbers (signature)
//     const jpgMagicNumbers = Buffer.from([255, 216, 255]) // JPG file signature

//     for (const jpgBuffer of results) {
//       expect(jpgBuffer.slice(0, 3)).toEqual(jpgMagicNumbers)
//     }

//     // Alternatively, if you just want to check mime type, you can use:
//     // const resultingExtension = extension(converter.to);
//     // expect(resultingExtension).toBe('jpg');
//   })
// })
