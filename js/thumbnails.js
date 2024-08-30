// Импортируем функцию openModal из модуля photo-modal.js
import { openModal } from "./photo-modal.js";

// Находим шаблон для миниатюры фотографии в HTML
const template = document.querySelector('#picture').content.querySelector('.picture');
// Находим элемент, в который будут добавляться миниатюры
const bigPictureNode = document.querySelector('.pictures');
// Сохраняем ссылку на контейнер для миниатюр
const container = document.querySelector('.pictures');

// Массив для хранения локальных данных о фотографиях
const localData = [];

// Функция для создания миниатюры фотографии
const createThumbnail = (photo) => {
  // Клонируем шаблон для создания новой миниатюры
  const thumbnail = template.cloneNode(true); // Исправлено на thumbnail
  // Находим элемент изображения в миниатюре
  const image = thumbnail.querySelector('.picture__img');
  // Устанавливаем источник и альтернативный текст для изображения
  image.src = photo.url;
  image.alt = photo.description;

  // Устанавливаем количество лайков и комментариев
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments ? photo.comments.length : 0; // Проверка на наличие комментариев: Если photo.comments может быть undefined, стоит добавить проверку, чтобы избежать ошибок.

  // Возвращаем созданную миниатюру
  return thumbnail;
};

// Функция для рендеринга карточек фотографий
const renderCards = (data) => {
  // Добавляем данные в локальный массив
  localData.push(...data.slice());
  // Создаем фрагмент документа для оптимизации рендеринга
  const fragment = document.createDocumentFragment();

  // Проходим по каждому элементу данных и создаем миниатюру
  data.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    // Сохраняем идентификатор фотографии в дата-атрибуте
    thumbnail.dataset.pictureId = photo.id; // Используем photo.id вместо id

    // Добавляем миниатюру в фрагмент
    fragment.appendChild(thumbnail);
  });

  // Добавляем все миниатюры в контейнер
  bigPictureNode.appendChild(fragment);
};

// Добавляем обработчик событий на контейнер для клика по миниатюрам
container.addEventListener('click', (evt) => {
  // Находим ближайшую миниатюру к месту клика
  const card = evt.target.closest('.picture');
  if (card) {
    // Получаем идентификатор фотографии из дата-атрибута
    const id = Number(card.dataset.pictureId);
    // Находим данные фотографии по идентификатору
    const photoData = localData.find((item) => item.id === id);
    // Выводим данные в консоль (для отладки)
    console.log(photoData);
    // Открываем модальное окно с данными фотографии
    openModal(photoData);
  }
});

// Экспортируем функцию renderCards для использования в других модулях
export { renderCards };
