import { exec as execAsync } from 'child_process'
import { promisify } from 'util'
import { ExecutionConverter } from '../converter'
const exec = promisify(execAsync)

export class ImageMagickConverter extends ExecutionConverter {
  async execute() {
    this.log(
      'Executing',
      `convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
    )
    await exec(
      `convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
      {
        cwd: this.cwd,
      }
    )
  }
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// export class PdfToConverter extends ImageMagickConverter {
//   override get from() {
//     return 'application/pdf'
//   }

//   constructor(to: MimeNode) {
//     super({ mime: 'application/pdf' }, to)
//   }

//   override output() {
//     const ext = mimeToFileExtension(this.to)
//     return `output.${ext}`
//   }
// }
