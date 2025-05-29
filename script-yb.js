'use strict'

/* for development/hotloading */
//import * as flipbook from '../src'

const flipbook = window.flipbook;
import * as book from './script-yb-images.js'

// FLIPBOOK FUNCTIONS

function main() {
function initializeFlipbook(pages) {
  book.init(pages, (err, bookObj) => {
    if (err) {
      console.error(err);
    } else {
      flipbook.init(bookObj, 'flipbook-container', {
          width: window.innerWidth * 0.48,
          height: window.innerHeight * 0.75,
          backgroundColor: '#00285D'
      }, (err, viewer) => {
        if (err) { console.error(err) }
          window.viewer = viewer;
          viewer.on('seen', n => console.log('page number: ' + n));
          viewer.flip_forward();
      });
    }
  });
}

window.onload = function () {
  const pages = [
    './flipbook-viewer/pages/2.png',
    './flipbook-viewer/pages/3.png',
    './flipbook-viewer/pages/4.png',
    './flipbook-viewer/pages/5.png',
    './flipbook-viewer/pages/6.png',
    './flipbook-viewer/pages/7.png',
    './flipbook-viewer/pages/8.png',
    './flipbook-viewer/pages/9.png',
    './flipbook-viewer/pages/10.png',
    './flipbook-viewer/pages/11.png',
    './flipbook-viewer/pages/12.png',
    './flipbook-viewer/pages/13.png',
    './flipbook-viewer/pages/14.png',
    './flipbook-viewer/pages/15.png',
    './flipbook-viewer/pages/16.png',
    './flipbook-viewer/pages/17.png',
    './flipbook-viewer/pages/18.png',
    './flipbook-viewer/pages/19.png',
    './flipbook-viewer/pages/20.png',
    './flipbook-viewer/pages/21.png',
    './flipbook-viewer/pages/22.png',
    './flipbook-viewer/pages/23.png',
    './flipbook-viewer/pages/24.png',
    './flipbook-viewer/pages/25.png',
    './flipbook-viewer/pages/26.png',
    './flipbook-viewer/pages/27.png',
    './flipbook-viewer/pages/28.png',
  ]

  initializeFlipbook(pages);

  window.addEventListener('resize', () => {
    // Optionally, clear the container before re-initializing
    document.getElementById('flipbook-container').innerHTML = '';
    initializeFlipbook(pages);
  });
  };

  main = () => {};
  }

main()


// EXTRA FUNCTIONS

window.flipCover = function() {
    document.querySelector('.coverpage').style.display = 'none';
    document.getElementById('buttons').style.display = 'flex';
    document.getElementById('flipbook-container').style.boxShadow = '10px 10px 20px #004AAD';
    if (window.viewer && typeof window.viewer.see === 'function') {
        window.viewer.see(3);
    }
}
