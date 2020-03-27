import { ipcRenderer } from 'electron';

const setIpc = () => {
  ipcRenderer.on('pong', (event, arg) => {
    console.log(`pong recibido - ${arg}`);
  });
};

const sendIpc = () => {
  ipcRenderer.send('ping', new Date());
};

module.exports = {
  setIpc,
  sendIpc
};
