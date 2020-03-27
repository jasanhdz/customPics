import fs from 'fs';
import path from 'path';
import isImage from 'is-image';
import filesize from 'filesize';
import { ipcMain, dialog } from 'electron';

export function setMainIpc(win) {
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
}
