import { readFile } from 'fs/promises'
import { join } from 'path'
import { ImageMagickConverter } from './converter'

const noop = () => {}

describe('image/jpeg', () => {
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
  ])(`image/jpeg => %s`, async (mime: any) => {
    const buffer = await readFile(join(__dirname, 'test.jpg'))
    const converter = new ImageMagickConverter(
      { mime: 'image/jpeg' },
      { mime },
      { dir: process.env.TEST_DIR }
    )
    converter.log = noop
    const [result] = await converter.convert([buffer])
    expect(result).toBeDefined()
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
