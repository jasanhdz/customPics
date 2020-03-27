'use strict';

// Iniciando los objetos app y BrowserWindow
import { app, BrowserWindow, ipcMain, dialog } from 'electron';

import path from 'path';
import devtools from './devtools';
import fs from 'fs';
import isImage from 'is-image';
import filesize from 'filesize';

let win;

if (process.env.NODE_ENV === 'development') {
  console.log('La variable de entorno funciono');
  devtools();
}

// Imprimiendo un mensaje en la consola antes de salir
app.on('before-quit', () => {
  console.log('saliendo');
});

// Ejecutando ordenes cuando la aplicación esta lista
app.on('ready', () => {
  // creando una ventana
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hello world',
    center: true,
    maximizable: false,
    show: false
  });

  win.once('ready-to-show', () => {
    win.show();
  });

  // win.on('move', () => {
  //   const position = win.getPosition()
  //   console.log(`la position de la ventana es ${position}`)
  // })

  // detectando el cierre de la ventana
  win.on('close', () => {
    win = null;
    app.quit();
  });

  win.loadURL(path.resolve(__dirname, 'renderer/index.html'));
});

ipcMain.on('open-directory', event => {
  dialog.showOpenDialog(
    win,
    {
      title: 'Seleciona la nueva úbicación',
      buttonLabel: 'Abrir ubicación',
      properties: ['openDirectory']
    },
    dir => {
      const images = [];
      if (dir) {
        fs.readdir(dir[0], (err, files) => {
          if (err) throw err;

          for (let i = 0; i < files.length; i++) {
            if (isImage(files[i])) {
              let imageFile = path.join(dir[0], files[i]);
              let stats = fs.statSync(imageFile);
              let size = filesize(stats.size, { round: 0 });
              images.push({
                filename: files[i],
                src: `file://${imageFile}`,
                size
              });
            }
          }

          event.sender.send('load-images', images);
        });
      }
    }
  );
});

ipcMain.on('open-save-dialog', (event, ext) => {
  console.log(ext);
  dialog.showSaveDialog(
    win,
    {
      title: 'Guardar imagen modificada',
      buttonLabel: 'Guardar imagen',
      filters: [{ name: 'Images', extensions: [ext.substr(1)] }]
    },
    file => {
      if (file) {
        event.sender.send('save-image', file);
      }
    }
  );
});

ipcMain.on('show-dialog', (event, info) => {
  dialog.showMessageBox(win, {
    type: info.type,
    title: info.title,
    message: info.msg
  });
});
