import url from 'url';
import path from 'path';
import applyFilter from './filter';
import { setIpc, sendIpc } from './ipcRendererEvents';

window.addEventListener('load', () => {
  setIpc();
  addImageEvents();
  searchImage();
  selectEvent();
  openDirectory();
});

const openDirectory = () => {
  const openDirectory = document.getElementById('open-directory');
  openDirectory.addEventListener('click', () => {
    sendIpc();
  });
};

const selectEvent = () => {
  const select = document.getElementById('filters');

  select.addEventListener('change', ({ currentTarget }) => {
    applyFilter(
      currentTarget.value,
      document.getElementById('image-displayed')
    );
  });
};

const addImageEvents = () => {
  const thumbs = document.querySelectorAll('li.list-group-item');
  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].addEventListener('click', ({ currentTarget }) => {
      changeImage(currentTarget);
    });
  }
};

const changeImage = node => {
  if (node) {
    document.querySelector('li.selected').classList.remove('selected');
    node.classList.add('selected');
    document.getElementById('image-displayed').src = node.querySelector(
      'img'
    ).src;
  } else {
    document.getElementById('image-displayed').src = '';
  }
};

const searchImage = () => {
  const $searchBox = document.getElementById('search-box');

  $searchBox.addEventListener('keyup', function() {
    const regex = new RegExp(this.value.toLowerCase(), 'gi');

    if (this.value.length > 0) {
      const thumbs = document.querySelectorAll('li.list-group-item img');
      for (let i = 0; i < thumbs.length; i++) {
        const fileUrl = url.parse(thumbs[i].src);
        const fileName = path.basename(fileUrl.pathname);
        if (fileName.match(regex)) {
          thumbs[i].parentNode.classList.remove('hidden');
        } else {
          thumbs[i].parentNode.classList.add('hidden');
        }
      }
      selectFirstImage();
    } else {
      const hidden = document.querySelectorAll('li.hidden');
      for (let i = 0; i < hidden.length; i++) {
        hidden[i].classList.remove('hidden');
      }
    }
  });
};

const selectFirstImage = () => {
  const image = document.querySelector('li.list-group-item:not(.hidden)');
  changeImage(image);
};
