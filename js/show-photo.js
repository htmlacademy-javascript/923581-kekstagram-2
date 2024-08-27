//* Импорт и выбор элементов
// Код начинается с импорта необходимых функций и выбора элементов DOM, которые будут использоваться для отображения большого изображения и комментариев.
//* Обработчики событий
// Основные функции showPhoto и closePhoto управляют открытием и закрытием модального окна.Они добавляют и удаляют обработчики событий для клавиатуры и кликов, обеспечивая интерактивность.
//* Генерация и отображение комментариев
// Функция renderComments отвечает за отображение комментариев, очищая предыдущие и добавляя новые, полученные из функции generateComments.
//* Закрытие модального окна
// Закрытие окна происходит как по клику на кнопку, так и по нажатию клавиш Escape или Enter, что делает интерфейс более удобным для пользователя.

// Импортируем функции для проверки нажатий клавиш и генерации комментариев
import { isEscapeKey, isEnterKey } from './util.js';
import { generateComments } from './data.js';

// Получаем элементы DOM, которые будем использовать
const bigPicture = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelector('.pictures');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsTemplate = bigPicture.querySelector('.social__comment');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

bigPictureOpen.setAttribute('tabindex', '0');

// Функция для обработки нажатий клавиш на документе
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) || isEnterKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

// Функция для отображения фотографии
const showPhoto = (evt) => {
  const imgElement = evt.target.closest('.picture__img');
  if (!imgElement) return;

  const imgSrc = imgElement.getAttribute('src');
  bigPictureImg.src = imgSrc;
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const pictureElement = imgElement.closest('.picture');
  const likesElement = pictureElement.querySelector('.picture__likes');
  const commentsCountElement = pictureElement.querySelector('.picture__comments');

  if (likesElement) {
    likesCount.textContent = likesElement.textContent;
  }

  const totalCount = parseInt(commentsCountElement.textContent, 10);
  const comments = generateComments();

  if (comments.length === 0) {
    console.warn('Нет комментариев для отображения');
    return;
  }

  renderComments(comments, totalCount);

  // Добавляем обработчики событий
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureClose.addEventListener('click', closePhoto);
  bigPictureClose.addEventListener('keydown', onClosePhotoKeydown);
  bigPicture.addEventListener('click', onClosePhotoClick);
};

// Функция для отображения комментариев
const renderComments = (comments, totalCount) => {
  const fragment = document.createDocumentFragment(); // Создаем фрагмент для оптимизации работы с DOM
  socialComments.innerHTML = ''; // Очищаем контейнер для комментариев

  const shownCount = comments.length; // Количество отображаемых комментариев

  // Устанавливаем ограничение на shownCount
  const displayedCount = Math.min(shownCount, totalCount); // Устанавливаем displayedCount как минимум из shownCount и totalCount

  document.querySelector('.social__comment-shown-count').textContent = displayedCount; // Обновляем отображаемое количество
  document.querySelector('.social__comment-total-count').textContent = totalCount; // Устанавливаем общее количество комментариев

  // Проходим по каждому комментарию и добавляем его в контейнер
  comments.forEach(comment => {
    const commentElement = socialCommentsTemplate.cloneNode(true); // Клонируем шаблон комментария
    const img = commentElement.querySelector('.social__picture'); // Получаем элемент изображения комментария
    const text = commentElement.querySelector('.social__text'); // Получаем элемент текста комментария

    // Заполняем данные комментария
    img.src = comment.avatar; // Устанавливаем аватар
    img.alt = comment.name; // Устанавливаем альтернативный текст
    text.textContent = comment.message; // Устанавливаем текст комментария

    fragment.appendChild(commentElement); // Добавляем элемент комментария во фрагмент
  });

  socialComments.appendChild(fragment); // Добавляем все комментарии во фрагмент в контейнер
};

// Функция для закрытия фотографии
const closePhoto = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureClose.removeEventListener('click', closePhoto);
  bigPictureClose.removeEventListener('keydown', onClosePhotoKeydown);
  bigPicture.removeEventListener('click', onClosePhotoClick);
};

// Функция для обработки нажатий клавиш на кнопке закрытия
const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closePhoto();
  }
};

// Функция для обработки клика вне изображения
const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) {
    closePhoto();
  }
};

// Добавляем обработчики событий для открытия фото
bigPictureOpen.addEventListener('click', showPhoto);
bigPictureOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    showPhoto(evt);
  }
});
