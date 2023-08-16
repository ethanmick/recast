#!/usr/bin/env zx

import GM from 'gm'

const gm = GM.subClass({ imageMagick: '7+' })

// const gm = require('gm').subClass({ imageMagick: '7+' });

console.log('TEst', gm)

gm('example.png')
  .stroke('#171717')
  .fill('#171717')
  .font('inter.ttf', 100)
  .gravity('Center')
  .drawText(0, 0, 'magick!')
  .write('drawing.png', function (err) {
    console.log('DONE', err)
    if (!err) console.log('done')
  })
