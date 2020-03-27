'use strict';

// Iniciando los objetos app y BrowserWindow
import { app, BrowserWindow, ipcMain } from 'electron';

import path from 'path';
import devtools from './devtools';

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
  let win = new BrowserWindow({
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

ipcMain.on('ping', (event, arg) => {
  console.log(`se recibio ping ${arg}`);
  event.sender.send('pong', new Date());
});
