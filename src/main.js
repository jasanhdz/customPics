'use strict';

// Iniciando los objetos app y BrowserWindow
import { app, BrowserWindow, ipcMain, dialog } from 'electron';

import path from 'path';
import devtools from './devtools';

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
      console.log(dir);
    }
  );
});
