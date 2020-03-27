'use strict';

// Iniciando los objetos app y BrowserWindow
import path from 'path';
import { app, BrowserWindow } from 'electron';

import { setupErrors } from './errors/handleErrors';
import devtools from './devtools';
import { setMainIpc } from './ipcMainEvents';

global.win;

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
  global.win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hello world',
    center: true,
    maximizable: false,
    show: false
  });

  setMainIpc(global.win);
  setupErrors(global.win);

  // Mostrar la ventana cuando el contenido a cargar sea cargado
  global.win.once('ready-to-show', () => {
    global.win.show();
  });

  // detectando el cierre de la ventana
  global.win.on('close', () => {
    global.win = null;
    app.quit();
  });

  global.win.loadURL(path.resolve(__dirname, 'renderer/index.html'));
});
