import { openModal } from './photo-modal.js';
import { showAlert } from './util.js';
import { ErrorText } from './api.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const bigPictureNode = document.querySelector('.pictures');
const localData = [];

// Функция для отрисовки миниатюр фото на странице
const renderCards = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    showAlert(ErrorText.ERROR_INVALID_DATA);
    return;
  }

  const existingThumbnails = bigPictureNode.querySelectorAll('.picture');
  existingThumbnails.forEach((thumbnail) => thumbnail.remove());

  const fragment = document.createDocumentFragment();

  data.forEach((photo) => {
    if (!localData.some((item) => item.id === photo.id)) {
      localData.push(photo);
    }
    const thumbnail = template.cloneNode(true);
    const image = thumbnail.querySelector('.picture__img');
    image.src = photo.url;
    image.alt = photo.description || '';

    thumbnail.querySelector('.picture__likes').textContent = photo.likes || 0;

    // Проверяем наличие комментариев и отображаем их количество
    const commentsCount = photo.comments?.length || 0;
    thumbnail.querySelector('.picture__comments').textContent = commentsCount;
    thumbnail.dataset.pictureId = photo.id;
    fragment.appendChild(thumbnail);
  });

  bigPictureNode.appendChild(fragment);
};

// Добавляем обработчик события на клик по миниатюре фото
bigPictureNode.addEventListener('click', (evt) => {
  const card = evt.target.closest('.picture');

  if (card) {
    const id = Number(card.dataset.pictureId);
    const photoData = localData.find((item) => item.id === id);
    if (photoData) {
      openModal(photoData);
    } else {
      showAlert(ErrorText.MESSAGE_NO_DATA_FOR_MODAL);
    }
  }
});

export { renderCards };
