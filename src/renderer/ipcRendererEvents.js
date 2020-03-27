import { ipcRenderer } from 'electron';
import {
  clearImages,
  loadImages,
  addImageEvents,
  selectFirstImage
} from './images-ui';
import path from 'path';

export const setIpc = () => {
  ipcRenderer.on('load-images', (event, images) => {
    clearImages();
    loadImages(images);
    addImageEvents();
    selectFirstImage();
  });

  ipcRenderer.on('save-image', (event, file) => {
    console.log(file);
  });
};

export const openDirectory = () => {
  ipcRenderer.send('open-directory');
};

export const saveFile = () => {
  const image = document.getElementById('image-displayed').dataset.original;
  console.log(image);
  const ext = path.extname(image);
  ipcRenderer.send('open-save-dialog', ext);
};
