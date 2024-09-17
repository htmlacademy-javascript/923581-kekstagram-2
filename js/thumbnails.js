// Импортируем функцию для открытия модального окна из другого модуля
import { openModal } from './photo-modal.js';

// Находим шаблон для создания миниатюр фото и элемент, в который будем вставлять миниатюры
const template = document.querySelector('#picture').content.querySelector('.picture');
const bigPictureNode = document.querySelector('.pictures');

// Находим контейнер для миниатюр фото и создаем локальный массив данных
const container = document.querySelector('.pictures');
const localData = [];

// Функция для создания миниатюры фото
const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true); // Клонируем шаблон

  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments ? photo.comments.length : 0;

  return thumbnail;
};

// Функция для отрисовки миниатюр фото на странице
const renderCards = (data) => {
  localData.push(...data.slice()); // Добавляем данные в локальный массив

  const fragment = document.createDocumentFragment(); // Создаем фрагмент для добавления элементов на страницу

  data.forEach((photo) => {
    const thumbnail = createThumbnail(photo); // Создаем миниатюру фото

    thumbnail.dataset.pictureId = photo.id; // Устанавливаем id фото в атрибуте data-picture-id

    fragment.appendChild(thumbnail); // Добавляем миниатюру во фрагмент
  });

  bigPictureNode.appendChild(fragment); // Добавляем фрагмент на страницу
};

// Добавляем обработчик события на клик по миниатюре фото
container.addEventListener('click', (evt) => {
  const card = evt.target.closest('.picture');

  if (card) {
    const id = Number(card.dataset.pictureId); // Получаем id фото из атрибута data-picture-id

    const photoData = localData.find((item) => item.id === id); // Находим данные фото в локальном массиве

    openModal(photoData); // Открываем модальное окно с фото
  }
});

// Экспортируем функцию для отрисовки миниатюр фото на странице
export { renderCards };
