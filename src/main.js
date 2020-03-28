'use strict';

// Iniciando los objetos app y BrowserWindow
import path from 'path';
import os from 'os';
import { app, BrowserWindow, Tray, globalShortcut, protocol } from 'electron';

import { setupErrors } from './errors/handleErrors';
import devtools from './devtools';
import { setMainIpc } from './ipcMainEvents';

global.win;
global.tray;

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
  protocol.registerFileProtocol(
    'plp',
    (request, callback) => {
      const url = request.url.substr(6);
      callback({ path: path.normalize(url) });
    },
    err => {
      if (err) throw err;
    }
  );

  // creando una ventana
  global.win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Hello world',
    center: true,
    maximizable: false,
    show: false,
    icon: path.join(__dirname, 'assets', 'icons', 'tray-icon.png')
  });

  globalShortcut.register('CommandOrControl+Alt+p', () => {
    global.win.show();
    global.win.focus();
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

  let icon;
  if (os.platform('win32')) {
    icon = path.join(__dirname, 'assets', 'icons', 'tray-icon.ico');
  } else {
    icon = path.join(__dirname, 'assets', 'icons', 'tray-icon.png');
  }
  global.tray = new Tray(icon);
  global.tray.setToolTip('CustomPics');
  global.tray.on('click', () => {
    global.win.isVisible() ? global.win.hide() : global.win.show();
  });

  global.win.loadURL(path.resolve(__dirname, 'renderer/index.html'));
});
