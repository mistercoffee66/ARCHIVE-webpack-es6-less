const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const fs = require('fs-extra');
const path = require('path');

const targetDir = './build'

function walkSync(dir, filelist) {

  let files = fs.readdirSync(path.join(dir));
  filelist = filelist || [];

  files.forEach((file) => {
    let filepath = path.join(dir,file);
    if (fs.statSync(filepath).isDirectory()) {
      filelist = walkSync(filepath, filelist);
    }
    else {
      filelist.push(filepath);
    }
  });
  return filelist;
};

function getImages(dir) {
  console.log('minifying images...')
  let files = walkSync(dir);
  files.map((file, i, arr) => {
    minifyImages(file);
  })
}

function minifyImages(file) {

  let filepath = file.substr(0,file.lastIndexOf('/'))
  let dest = path.join(targetDir, filepath)

  imagemin([file], dest, {
    plugins: [
      imageminJpegRecompress({max: 75}),
      imageminPngquant({quality: '65-80'})
    ]
  }).then(file => {
    //console.log('minifying to ' + file[0].path);
  });
}

function getOthers(source) {
  console.log('copying static files');
  fs.copy(source, path.join(targetDir, source));
}

getImages('static/img/')
//getOthers('static/pdf/')



