import { remote } from 'electron';
import settings from 'electron-settings';
import { ipcRenderer } from 'electron';

window.addEventListener('load', () => {
  cancelButton();
  saveButton();

  if (settings.has('cloudup.user')) {
    document.getElementById('cloudup-user').value = settings.get(
      'cloudup.user'
    );
    document.getElementById('cloudup-passwd').value = settings.get(
      'cloudup.passwd'
    );
  }
});

const cancelButton = () => {
  const $cancelBtn = document.getElementById('cancel-button');

  $cancelBtn.addEventListener('click', () => {
    const prefsWindow = remote.getCurrentWindow();
    prefsWindow.close();
  });
};

const saveButton = () => {
  const $saveBtn = document.getElementById('save-button');
  const prefsForm = document.getElementById('preferences-form');

  $saveBtn.addEventListener('click', () => {
    if (prefsForm.reportValidity()) {
      settings.set(
        'cloudup.user',
        document.getElementById('cloudup-user').value
      );
      settings.set(
        'cloudup.passwd',
        document.getElementById('cloudup-passwd').value
      );
      const prefsWindow = remote.getCurrentWindow();
      prefsWindow.close();
    } else {
      showDialog(
        'error',
        'CustomPics',
        'Por favor complete los campos requeridos'
      );
    }
  });
};

const showDialog = (type, title, msg) => {
  ipcRenderer.send('show-dialog', { type, title, msg });
};
