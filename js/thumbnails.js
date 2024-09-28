// Импортируем функцию для открытия модального окна из другого модуля
import { openModal } from './photo-modal.js';

// Находим шаблон для создания миниатюр фото и элемент, в который будем вставлять миниатюры
const template = document.querySelector('#picture').content.querySelector('.picture');
const bigPictureNode = document.querySelector('.pictures');

// Находим контейнер для миниатюр фото и создаем локальный массив данных
const container = document.querySelector('.pictures');
const localData = [];

// Функция для отрисовки миниатюр фото на странице
const renderCards = (data) => {
  localData.push(...data.slice()); // Добавляем данные в локальный массив

  const fragment = document.createDocumentFragment();

  // Используем цикл for вместо forEach
  for (let i = 0; i < data.length; i++) {
    const photo = data[i];
    const thumbnail = template.cloneNode(true); // Клонируем шаблон

    const image = thumbnail.querySelector('.picture__img');
    image.src = photo.url;
    image.alt = photo.description;

    thumbnail.querySelector('.picture__likes').textContent = photo.likes;

    // Проверяем наличие комментариев и отображаем их количество
    const commentsCount = Array.isArray(photo.comments) ? photo.comments.length : 0;
    thumbnail.querySelector('.picture__comments').textContent = commentsCount;

    thumbnail.dataset.pictureId = photo.id; // Устанавливаем ID миниатюры
    fragment.appendChild(thumbnail); // Добавляем миниатюру во фрагмент
  }

  bigPictureNode.appendChild(fragment); // Добавляем фрагмент в DOM
};

// Добавляем обработчик события на клик по миниатюре фото
container.addEventListener('click', (evt) => {
  const card = evt.target.closest('.picture');

  if (card) {
    const id = Number(card.dataset.pictureId);
    const photoData = localData.find((item) => item.id === id);
    openModal(photoData);
  }
});

export { renderCards };
