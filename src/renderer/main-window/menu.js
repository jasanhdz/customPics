import { remote } from 'electron';
import {
  openDirectory,
  saveFile,
  openPreferens,
  pasteImage
} from './ipcRendererEvents';
import { print } from './images-ui';

export const createMenu = () => {
  const template = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Abrir Ubicación',
          accelerator: 'CmdOrCtrl+O',
          click() {
            openDirectory();
          }
        },
        {
          label: 'Guardar',
          accelerator: 'CmdOrCtrl+G',
          click() {
            saveFile();
          }
        },
        {
          label: 'Preferencias',
          accelerator: 'CmdOrCtrl+,',
          click() {
            openPreferens();
          }
        },
        {
          label: 'Cerrar',
          accelerator: 'CmdOrCtrl+Q',
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edición',
      submenu: [
        {
          label: 'Imprimir',
          accelerator: 'CmdOrCtrl+P',
          click() {
            print();
          }
        },
        {
          label: 'Subir a Cloudup',
          accelerator: 'CmdOrCtrl+U'
        },
        {
          label: 'Pegar Imagen',
          accelerator: 'CmdOrCtrl+V',
          click() {
            pasteImage();
          }
        }
      ]
    }
  ];
  const menu = remote.Menu.buildFromTemplate(template);
  remote.Menu.setApplicationMenu(menu);
};
