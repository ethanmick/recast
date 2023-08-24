import { mimes } from './mime'
import mime from './mime.json'

describe('mime.json', () => {
  it('should have top-level keys in alphabetical order', () => {
    const keys = Object.keys(mime)
    const sortedKeys = [...keys].sort()
    expect(keys).toEqual(sortedKeys)
  })
})

describe('Types JSON structure', () => {
  it('should match the MimeType type structure', () => {
    Object.values(mimes).forEach((value) => {
      expect(Array.isArray(value.extensions)).toBe(true)
      value.extensions.forEach((extension) => {
        expect(typeof extension).toBe('string')
      })
    })
  })
})
