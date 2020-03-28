import { remote } from 'electron';
import settings from 'electron-settings';
import { ipcRenderer } from 'electron';
import crypto from 'crypto';

window.addEventListener('load', () => {
  cancelButton();
  saveButton();
  console.log(settings.file());

  if (settings.has('cloudup.user')) {
    document.getElementById('cloudup-user').value = settings.get(
      'cloudup.user'
    );
  }
  if (settings.has('cloudup.passwd')) {
    const decipher = crypto.createDecipher('aes-128-cbc', 'mypassword');
    let decryped = decipher.update(
      settings.get('cloudup.passwd'),
      'hex',
      'utf8'
    );
    decryped += decipher.final('utf-8');

    document.getElementById('cloudup-passwd').value = decryped;
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
      const cipher = crypto.createCipher('aes-128-cbc', 'mypassword');
      let encrypted = cipher.update(
        document.getElementById('cloudup-passwd').value,
        'utf8',
        'hex'
      );
      encrypted += cipher.final('hex');

      settings.set(
        'cloudup.user',
        document.getElementById('cloudup-user').value
      );
      settings.set('cloudup.passwd', encrypted);
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
