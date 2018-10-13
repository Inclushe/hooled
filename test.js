var Controller = require('./Controller')
var strip = new Controller(60)

var tests = [
  () => {
    console.log('Fill LED w/ red.')
    strip.set(255, 0, 0)
    strip.write()
  },
  () => {
    console.log('Fill LED w/ green.')
    strip.set(0, 255, 0)
    strip.write()
  },
  () => {
    console.log('Fill LED w/ blue.')
    strip.set(0, 0, 255)
    strip.write()
  },
  () => {
    console.log('Fill LED w/ red (hex).')
    strip.setHex('#FF0000')
    strip.write()
  },
  () => {
    console.log('Fill LED w/ green (hex).')
    strip.setHex('#00FF00')
    strip.write()
  },
  () => {
    console.log('Fill LED w/ blue (hex).')
    strip.setHex('#0000FF')
    strip.write()
  },
  () => {
    console.log('Fill length of LED.')
    var i = 0
    strip.clear()
    var fillInterval = setInterval(() => {
      if (i < 60) {
        strip.setPixel(i, 255, 255, 255)
        strip.write()
        i++
      } else {
        clearInterval(fillInterval)
      }
    }, 16)
  },
  () => {
    console.log('Fill length of LED (Hex).')
    var i = 0
    strip.clear()
    var fillInterval = setInterval(() => {
      if (i < 60) {
        strip.setPixelHex(i, '#123456')
        strip.write()
        i++
      } else {
        clearInterval(fillInterval)
      }
    }, 16)
  },
  () => {
    console.log('Clear LED strip.')
    strip.clear()
    strip.write()
  }
]

var index = 0
var testingInterval = setInterval(() => {
  if (index < tests.length) {
    console.log(`RUNNING TEST ${index}:`)
    tests[index]()
    index++
  } else {
    clearInterval(testingInterval)
  }
}, 2000)
