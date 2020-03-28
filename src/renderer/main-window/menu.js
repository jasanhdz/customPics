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
          click() {
            openDirectory();
          }
        },
        {
          label: 'Guardar',
          click() {
            saveFile();
          }
        },
        {
          label: 'Preferencias',
          click() {
            openPreferens();
          }
        },
        {
          label: 'Cerrar',
          rol: 'quit'
        }
      ]
    },
    {
      label: 'Edición',
      submenu: [
        {
          label: 'Imprimir',
          click() {
            print();
          }
        },
        {
          label: 'Subir a Cloudup'
        },
        {
          label: 'Pegar Imagen',
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
