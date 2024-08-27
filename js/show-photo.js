import { isEscapeKey, isEnterKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelector('.pictures');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsTemplate = bigPicture.querySelector('.social__comment');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');



const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

const showPhoto = (evt) => {
  if (evt.target.closest('.picture__img')) {
    const imgSrc = evt.target.getAttribute('src'); // Получаем путь к изображению
    bigPictureImg.src = imgSrc; // Устанавливаем источник изображения
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);

    // Обновляем количество лайков
    const likesElement = evt.target.closest('.picture').querySelector('.picture__likes');
    if (likesElement) {
      likesCount.textContent = likesElement.textContent;
    }


  }
};






//  ==============================================

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




