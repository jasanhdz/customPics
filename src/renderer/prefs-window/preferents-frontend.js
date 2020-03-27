import { remote } from 'electron';

window.addEventListener('load', () => {
  cancelButton();
});

const cancelButton = () => {
  const $cancelBtn = document.getElementById('cancel-button');

  $cancelBtn.addEventListener('click', ({ currentTarget }) => {
    const prefsWindow = remote.getCurrentWindow();
    prefsWindow.close();
  });
};
