import { app, dialog } from 'electron';

const relaunchApp = win => {
  dialog.showMessageBox(
    win,
    {
      type: 'Error',
      title: 'CustomPics',
      message: 'Ocurrió un error inesperado, se reiniciará el aplicativo'
    },
    () => {
      app.relaunch();
      app.exit(0);
    }
  );
};

const waitProcess = win => {
  dialog.showMessageBox(win, {
    type: 'Warning',
    title: 'CustomPics',
    message:
      'Un proceso está tardando demasiado, puede esperar o reiniciar el aplicativo manualmente'
  });
};

export const setupErrors = win => {
  win.webContents.on('crashed', () => {
    relaunchApp(win);
  });

  win.on('unresponsive', () => {
    waitProcess(win);
  });

  process.on('uncaughtException', () => {
    relaunchApp(win);
  });
};
