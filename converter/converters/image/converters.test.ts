import { readFile } from 'fs/promises'
import { Converter } from '../def'
import { buildConverter } from './converters'

describe('JPG to PNG Converter', () => {
  let converter: Converter

  beforeAll(() => {
    converter = buildConverter('image/jpeg', 'image/png')
  })

  it('should convert "example.jpg" to PNG format', async () => {
    // Read the JPG file
    console.log('Test', __dirname, process.cwd())
    const jpgBuffer = await readFile('test.jpg')

    // Use the converter
    const [pngBuffer] = await converter([jpgBuffer])

    // Check the resulting buffer to see if it has the PNG magic numbers (signature)
    const pngMagicNumbers = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]) // PNG file signature

    expect(pngBuffer.slice(0, 8)).toEqual(pngMagicNumbers)

    // Alternatively, if you just want to check mime type, you can use:
    // const resultingExtension = extension(converter.to);
    // expect(resultingExtension).toBe('png');
  })
})
