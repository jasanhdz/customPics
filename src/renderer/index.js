window.addEventListener('load', () => addImageEvents());

function addImageEvents() {
  const thumbs = document.querySelectorAll('li.list-group-item');

  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].addEventListener('click', ({ currentTarget }) => {
      changeImage(currentTarget);
    });
  }
}

function changeImage(node) {
  document.querySelector('li.selected').classList.remove('selected');
  node.classList.add('selected');
  document.getElementById('image-displayed').src = node.querySelector(
    'img'
  ).src;
}
