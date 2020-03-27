import fs from 'fs';

export const applyFilter = (filter, currentImage) => {
  let imgObj = new Image();
  imgObj.src = currentImage.src;

  filterous
    .importImage(imgObj, {})
    .applyInstaFilter(filter)
    .renderHtml(currentImage);
};

export const saveImage = (fileName, callback) => {
  let fileSrc = document.getElementById('image-displayed').src;
  fileSrc = fileSrc.replace(/^data:([A-Za-z-+/]+);base64,/, '');
  fs.writeFile(fileName, fileSrc, 'base64', callback);
};
