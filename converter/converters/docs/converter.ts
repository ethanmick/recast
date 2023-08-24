import { exec as execAsync } from 'child_process'
import { promisify } from 'util'
import { ExecutionConverter } from '../converter'
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
  async execute() {
    console.log(
      'Executing',
      `libreoffice --headless ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
    )
    await exec(
      `libreoffice --headless ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
      {
        cwd: this.cwd,
      }
    )
  }
}
