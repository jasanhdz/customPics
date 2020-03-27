import url from 'url';
import path from 'path';

window.addEventListener('load', () => {
  addImageEvents();
  searchImage();
});

const addImageEvents = () => {
  const thumbs = document.querySelectorAll('li.list-group-item');
  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].addEventListener('click', ({ currentTarget }) => {
      changeImage(currentTarget);
    });
  }
};

const changeImage = node => {
  document.querySelector('li.selected').classList.remove('selected');
  node.classList.add('selected');
  document.getElementById('image-displayed').src = node.querySelector(
    'img'
  ).src;
};

const searchImage = () => {
  const $searchBox = document.getElementById('search-box');

  $searchBox.addEventListener('keyup', function() {
    const regex = new RegExp(this.value.toLowerCase(), 'gi');

    const thumbs = document.querySelectorAll('li.list-group-item img');
    if (this.value.length > 0) {
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
      for (let i = 0; i < thumbs.length; i++) {
        thumbs[i].parentNode.classList.remove('hidden');
      }
    }
  });
};

const selectFirstImage = () => {
  const image = document.querySelector('li.list-group-item:not(.hidden)');
  changeImage(image);
};
