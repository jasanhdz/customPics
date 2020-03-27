import path from 'path';
import os from 'os';
import { ipcRenderer, remote } from 'electron';
import {
  clearImages,
  loadImages,
  addImageEvents,
  selectFirstImage
} from './images-ui';
import { saveImage } from './filter';

export const setIpc = () => {
  ipcRenderer.on('load-images', (event, images) => {
    clearImages();
    loadImages(images);
    addImageEvents();
    selectFirstImage();
  });

  ipcRenderer.on('save-image', (event, file) => {
    saveImage(file, err => {
      if (err) return showDialog('error', 'CustomPics', err.message);
      showDialog('info', 'CustomPics', 'La imagen fue guardada 👍');
    });
  });
};

export const openPreferens = () => {
  const BrowserWindow = remote.BrowserWindow;
  const mainWindow = remote.getGlobal('win');

  const preferecesWindow = new BrowserWindow({
    width: 400,
    height: 300,
    title: 'Preferencias',
    center: true,
    modal: true,
    frame: false,
    show: false
  });

  if (os.platform() !== 'win32') {
    preferecesWindow.setParentWindow(mainWindow);
  }
  preferecesWindow.once('ready-to-show', () => {
    preferecesWindow.show();
    preferecesWindow.focus();
  });
  preferecesWindow.show();
  preferecesWindow.loadURL(path.resolve(__dirname, '../preferents.html'));
};

export const openDirectory = () => {
  ipcRenderer.send('open-directory');
};

export const showDialog = (type, title, msg) => {
  ipcRenderer.send('show-dialog', { type, title, msg });
};

export const saveFile = () => {
  const image = document.getElementById('image-displayed').dataset.original;
  console.log(image);
  const ext = path.extname(image);
  ipcRenderer.send('open-save-dialog', ext);
};
