import {
  setIpc,
  openDirectory,
  saveFile,
  openPreferens
} from './main-window/ipcRendererEvents';
import {
  addImageEvents,
  searchImage,
  selectEvent,
  print
} from './main-window/images-ui';

window.addEventListener('load', () => {
  setIpc();
  addImageEvents();
  searchImage();
  selectEvent();
  buttonEvent('open-directory', openDirectory);
  buttonEvent('save-button', saveFile);
  buttonEvent('open-preferences', openPreferens);
  buttonEvent('print-button', print);
});

const buttonEvent = (id, func) => {
  const openDirectory = document.getElementById(id);
  openDirectory.addEventListener('click', func);
};
