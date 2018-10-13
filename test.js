var Controller = require('./Controller')
var led = new Controller(60)

var tests = [
  () => {
    console.log('Fill LED w/ red.')
    led.set(255, 0, 0)
    led.write()
  },
  () => {
    console.log('Fill LED w/ green.')
    led.set(0, 255, 0)
    led.write()
  },
  () => {
    console.log('Fill LED w/ blue.')
    led.set(0, 0, 255)
    led.write()
  },
  () => {
    console.log('Fill LED w/ red (hex).')
    led.setHex('#FF0000')
    led.write()
  },
  () => {
    console.log('Fill LED w/ green (hex).')
    led.setHex('#00FF00')
    led.write()
  },
  () => {
    console.log('Fill LED w/ blue (hex).')
    led.setHex('#0000FF')
    led.write()
  },
  () => {
    console.log('Fill length of LED.')
    var i = 0
    led.clear()
    var fillInterval = setInterval(() => {
      if (i < 60) {
        led.setPixel(i, 255, 255, 255)
        led.write()
        i++
      } else {
        clearInterval(fillInterval)
      }
    }, 16)
  },
  () => {
    console.log('Fill length of LED (Hex).')
    var i = 0
    led.clear()
    var fillInterval = setInterval(() => {
      if (i < 60) {
        led.setPixelHex(i, '#123456')
        led.write()
        i++
      } else {
        clearInterval(fillInterval)
      }
    }, 16)
  },
  () => {
    console.log('Clear LED strip.')
    led.clear()
    led.write()
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
