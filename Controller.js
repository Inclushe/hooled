/*
  Buffer contains in order:
    Start frame: 4 empty bytes (0x00 0x00 0x00 0x00)
    For each pixel (4 bytes):
      Brightness: 111 + 5 bits = 1 byte (0xE0 through 0xFF)
      Blue: 1 byte (0x00 through 0xFF)
      Green: 1 byte (0x00 through 0xFF)
      Red: 1 byte (0x00 through 0xFF)
    End frame: 4 empty bytes (0x00 0x00 0x00 0x00)
*/

var rpio = require('rpio')
rpio.init({ mapping: 'gpio', gpiomem: false })

function hexToRGB (hex) {
  hex = hex.replace('#', '')
  var r = parseInt(hex[0] + hex[1], 16)
  var g = parseInt(hex[2] + hex[3], 16)
  var b = parseInt(hex[4] + hex[5], 16)
  if (hex.length !== 6 || Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    throw new Error('Hex is invalid')
  } else {
    return [r, g, b]
  }
}

function Controller (num, clock) {
  this.numLED = 0
  this.ledBuffer = Buffer.alloc(1)
  this.finishedSetup = false
  if (num) {
    if (clock) this.setup(num, clock)
    else this.setup(num)
  }
}

Controller.prototype.notSetupMessage = function () {
  console.log('Not setup.')
}

Controller.prototype.setup = function (num, clock) {
  this.numLED = num
  this.ledBuffer = Buffer.alloc((this.numLED * 4) + 8)
  this.finishedSetup = true
  rpio.spiBegin()
  rpio.spiSetClockDivider(clock || 128)
}

Controller.prototype.set = function (r, g, b, brightness) {
  if (!this.finishedSetup) {
    this.notSetupMessage()
    return
  }
  // Check if brightness is not set or out of range. If so, set to full.
  if (!(brightness >= 0xE0 && brightness <= 0xFF)) brightness = 0xFF

  for (var currentIndex = 0; currentIndex < this.numLED; currentIndex++) {
    // Sets brightness of pixel at current index
    this.ledBuffer[4 + (currentIndex * 4) + 0] = brightness
    // Sets blue of pixel at current index
    this.ledBuffer[4 + (currentIndex * 4) + 1] = b
    // Sets green of pixel at current index
    this.ledBuffer[4 + (currentIndex * 4) + 2] = g
    // Sets red of pixel at current index
    this.ledBuffer[4 + (currentIndex * 4) + 3] = r
  }
}

Controller.prototype.setHex = function (hex) {
  var rgbArray = hexToRGB(hex)
  this.set(rgbArray[0], rgbArray[1], rgbArray[2])
}

Controller.prototype.setPixel = function (index, r, g, b, brightness) {
  if (!this.finishedSetup) {
    this.notSetupMessage()
    return
  }
  // console.log(index)
  // Check if brightness is not set or out of range. If so, set to full.
  if (!(brightness >= 0xE0 && brightness <= 0xFF)) brightness = 0xFF
  // Sets brightness of pixel at index
  this.ledBuffer[4 + (index * 4) + 0] = brightness
  // Sets blue of pixel at index
  this.ledBuffer[4 + (index * 4) + 1] = b
  // Sets green of pixel at index
  this.ledBuffer[4 + (index * 4) + 2] = g
  // Sets red of pixel at index
  this.ledBuffer[4 + (index * 4) + 3] = r
}

Controller.prototype.setPixelHex = function (index, hex) {
  var rgbArray = hexToRGB(hex)
  this.setPixel(index, rgbArray[0], rgbArray[1], rgbArray[2])
}

Controller.prototype.write = function () {
  if (!this.finishedSetup) {
    this.notSetupMessage()
    return
  }
  rpio.spiWrite(this.ledBuffer, (this.numLED * 4) + 8)
}

Controller.prototype.clear = function () {
  this.set(0, 0, 0)
}

module.exports = Controller
