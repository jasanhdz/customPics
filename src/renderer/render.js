import {
  setIpc,
  openDirectory,
  saveFile,
  openPreferens
} from './ipcRendererEvents';
import { addImageEvents, searchImage, selectEvent } from './images-ui';

window.addEventListener('load', () => {
  setIpc();
  addImageEvents();
  searchImage();
  selectEvent();
  buttonEvent('open-directory', openDirectory);
  buttonEvent('save-button', saveFile);
  buttonEvent('open-preferences', openPreferens);
});

const buttonEvent = (id, func) => {
  const openDirectory = document.getElementById(id);
  openDirectory.addEventListener('click', func);
};
