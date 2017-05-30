import * as Utils from './app/helpers/utils'

import './app/styles/main.less'
import oohOoh from './app/img/ooh-ooh.jpg'

class App {
  constructor (name) {
    this.name = name
    this.viewport = Utils.viewport()
  }
  init() {
    console.log('init!')
    const img = document.createElement('img')
    img.src = oohOoh
    document.querySelector('body').appendChild(img)
  }
}

const app = new App('myApp')
window.onload = () => {
  app.init()
}