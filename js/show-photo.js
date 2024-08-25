import { isEscapeKey, isEnterKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelector('.pictures');
const bigPictureClose = document.querySelector('#picture-cancel');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

function showPhoto(evt) {
  if (evt.target.closest('.picture__img')) {
    const imgSrc = evt.target.getAttribute('src'); // Получаем путь к изображению
    bigPicture.querySelector('img').src = imgSrc; // Устанавливаем источник изображения




    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);
  }
}

function closePhoto() {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureOpen.addEventListener('click', (evt) => {
  showPhoto(evt);
});

bigPictureOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    showPhoto(evt);
  }
});

bigPictureClose.addEventListener('click', () => {
  closePhoto();
});

bigPictureClose.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePhoto();
  }
});





