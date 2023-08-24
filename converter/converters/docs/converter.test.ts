import { readFile } from 'fs/promises'
import { join } from 'path'
import { PandocConverter } from './converter'

const noop = () => {}
describe('text/plain', () => {
  it('conver to application/msword', async () => {
    const buffer = await readFile(join(__dirname, 'test.txt'))
    const converter = new PandocConverter(
      { mime: 'text/plain' },
      {
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
      { dir: process.env.TEST_DIR }
    )
    converter.log = noop
    const [result] = await converter.convert([buffer])
    expect(result).toBeDefined()
  })

  //   test.each(['image/pages', 'image/text'])(
  //     `image/jpeg => %s`,
  //     async (mime: any) => {
  //       const buffer = await readFile(join(__dirname, 'test.jpg'))
  //       const converter = new PandocConverter(
  //         { mime: 'image/jpeg' },
  //         { mime },
  //         { dir: process.env.TEST_DIR }
  //       )
  //       converter.log = noop
  //       const [result] = await converter.convert([buffer])
  //       expect(result).toBeDefined()
  //     }
  //   )
})
