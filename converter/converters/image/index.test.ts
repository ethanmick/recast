import { readFile } from 'fs/promises'
import { join } from 'path'
import { ImageMagickConverter, PdfToConverter } from '.'
import { Converter } from '../../types'

describe('JPG to PNG Converter', () => {
  let converter: Converter

  beforeAll(() => {
    converter = new ImageMagickConverter(
      { mime: 'image/jpeg' },
      { mime: 'image/png' }
    )
  })

  it('should convert "example.jpg" to PNG format', async () => {
    // Read the JPG file
    console.log('Test', __dirname, process.cwd())
    const jpgBuffer = await readFile(join(__dirname, 'test.jpg'))

    // Use the converter
    const [pngBuffer] = await converter.convert([jpgBuffer])

    // Check the resulting buffer to see if it has the PNG magic numbers (signature)
    const pngMagicNumbers = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]) // PNG file signature

    expect(pngBuffer.slice(0, 8)).toEqual(pngMagicNumbers)

    // Alternatively, if you just want to check mime type, you can use:
    // const resultingExtension = extension(converter.to);
    // expect(resultingExtension).toBe('png');
  })
})

describe('PDF to JPG Converter', () => {
  let converter: Converter

  beforeAll(() => {
    converter = new PdfToConverter({ mime: 'image/jpeg' })
  })

  it('should convert "test.pdf" to JPG format', async () => {
    // Read the PDF file
    const pdfBuffer = await readFile(join(__dirname, 'test.pdf'))

    // Use the converter
    const results = await converter.convert([pdfBuffer])

    // Check the resulting buffer to see if it has the JPG magic numbers (signature)
    const jpgMagicNumbers = Buffer.from([255, 216, 255]) // JPG file signature

    for (const jpgBuffer of results) {
      expect(jpgBuffer.slice(0, 3)).toEqual(jpgMagicNumbers)
    }

    // Alternatively, if you just want to check mime type, you can use:
    // const resultingExtension = extension(converter.to);
    // expect(resultingExtension).toBe('jpg');
  })
})
