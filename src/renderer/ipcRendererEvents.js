import { ipcRenderer } from 'electron';

const setIpc = () => {
  ipcRenderer.on('pong', (event, arg) => {
    console.log(`pong recibido - ${arg}`);
  });
};

const openDirectory = () => {
  ipcRenderer.send('open-directory');
};

module.exports = {
  setIpc,
  openDirectory
};
