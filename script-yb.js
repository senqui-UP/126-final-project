'use strict'

/* for development/hotloading */
//import * as flipbook from '../src'

const flipbook = window.flipbook;

import * as book from './yb-images.js'

function main() {
window.onload = function () {
  const pages = [
        './flipbook-viewer/pages/2.jpg',
        './flipbook-viewer/pages/3.jpg',
        './flipbook-viewer/pages/4.jpg',
        './flipbook-viewer/pages/5.jpg',
        './flipbook-viewer/pages/6.jpg',
        './flipbook-viewer/pages/7.jpg',
  ]

  const next = document.getElementById('next')
  const prev = document.getElementById('prev')
  const zoom = document.getElementById('zoom')

  book.init(pages, (err, book) => {
    if(err) console.error(err)
    else flipbook.init(book, 'flipbook-container', (err, viewer) => {
      if(err) console.error(err)

      window.viewer = viewer;
      
      viewer.on('seen', n => console.log('page number: ' + n))
    })
  })
}
}

main()
