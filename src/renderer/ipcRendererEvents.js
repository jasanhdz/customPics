import { ipcRenderer } from 'electron';
import {
  clearImages,
  loadImages,
  addImageEvents,
  selectFirstImage
} from './images-ui';

const setIpc = () => {
  ipcRenderer.on('load-images', (event, images) => {
    clearImages();
    loadImages(images);
    addImageEvents();
    selectFirstImage();
  });
};

const openDirectory = () => {
  ipcRenderer.send('open-directory');
};

module.exports = {
  setIpc,
  openDirectory
};
