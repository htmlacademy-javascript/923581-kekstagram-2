// Импортируем функцию для открытия модального окна из другого модуля
import { openModal } from './photo-modal.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const bigPictureNode = document.querySelector('.pictures');
const localData = [];

// Функция для отрисовки миниатюр фото на странице
const renderCards = (data) => {
  // localData.push(...data); // Добавляем данные в локальный массив
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('Переданы некорректные данные для отрисовки миниатюр.');
    return; // Проверяем входные данные
  }

  const existingThumbnails = bigPictureNode.querySelectorAll('.picture');
  existingThumbnails.forEach(thumbnail => thumbnail.remove());

  const fragment = document.createDocumentFragment();

  data.forEach(photo => {
    if (!localData.some(item => item.id === photo.id)) {
      localData.push(photo); // Добавляем только уникальные элементы
    }
    const thumbnail = template.cloneNode(true); // Клонируем шаблон
    const image = thumbnail.querySelector('.picture__img');
    image.src = photo.url;
    image.alt = photo.description || '';

    thumbnail.querySelector('.picture__likes').textContent = photo.likes || 0;

    // Проверяем наличие комментариев и отображаем их количество
    const commentsCount = photo.comments?.length || 0; // Упрощаем проверку
    thumbnail.querySelector('.picture__comments').textContent = commentsCount;
    thumbnail.dataset.pictureId = photo.id; // Устанавливаем ID миниатюры
    fragment.appendChild(thumbnail); // Добавляем миниатюру во фрагмент
  });

  bigPictureNode.appendChild(fragment); // Добавляем фрагмент в DOM
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
      console.warn('Не найдены данные для открытия модального окна.');
    }
  }
});

export { renderCards };
