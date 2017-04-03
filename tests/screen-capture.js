const leftPad = require('left-pad')

export class ScreenCapture {
  constructor (savePath, casper) {
    this.savePath = savePath
    this.casper = casper
    this.index = 1
  }

  snapshot (name) {
    const captureNumber = leftPad(this.index.toString(), 3, '0')
    const path = `./captures/${this.savePath}/${captureNumber}_${name}.png`
    this.casper.capture(path)
    this.index ++
  }
}
