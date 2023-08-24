import { exec as execAsync } from 'child_process'
import { promisify } from 'util'
import { ExecutionConverter } from '../converter'
import { mimeToFileExtension } from '../mime'
const exec = promisify(execAsync)

export class PandocConverter extends ExecutionConverter {
  override outputOptions() {
    const options = super.outputOptions()
    return `${options} -s -o`
  }

  async execute() {
    console.log(
      'Executing',
      `pandoc ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
    )
    await exec(
      `pandoc ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
      {
        cwd: this.cwd,
      }
    )
  }
}

export class PDF2DocXConverter extends ExecutionConverter {
  async execute() {
    console.log(
      'Executing',
      `pdf2docx convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
    )
    await exec(
      `pdf2docx convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
      {
        cwd: this.cwd,
      }
    )
  }
}

export class LibreOfficeConverter extends ExecutionConverter {
  override outputOptions() {
    const options = super.outputOptions()
    return `${options} --convert-to ${mimeToFileExtension(this.toNode.mime)}`
  }

  async execute() {
    const cmd = `libreoffice --headless --invisible ${this.inputOptions()} ${this.outputOptions()} ${this.input()}`
    console.log('Executing', cmd)
    await exec(cmd, { cwd: this.cwd })
  }
}
