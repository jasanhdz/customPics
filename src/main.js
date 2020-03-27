'use strict';

// Iniciando los objetos app y BrowserWindow
import path from 'path';
import { app, BrowserWindow } from 'electron';

import { setupErrors } from './errors/handleErrors';
import devtools from './devtools';
import { setMainIpc } from './ipcMainEvents';

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

  setMainIpc(win);
  setupErrors(win);

  // Mostrar la ventana cuando el contenido a cargar sea cargado
  win.once('ready-to-show', () => {
    win.show();
  });

  // detectando el cierre de la ventana
  win.on('close', () => {
    win = null;
    app.quit();
  });

  win.loadURL(path.resolve(__dirname, 'renderer/index.html'));
});
