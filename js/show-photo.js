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
const bigPicture = document.querySelector('.big-picture'); // Модальное окно с большим изображением
const bigPictureOpen = document.querySelector('.pictures'); // Элемент, по которому кликаем для открытия изображения
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // Изображение в модальном окне
const likesCount = bigPicture.querySelector('.likes-count'); // Элемент для отображения количества лайков
const socialComments = bigPicture.querySelector('.social__comments'); // Контейнер для комментариев
const socialCommentsTemplate = bigPicture.querySelector('.social__comment'); // Шаблон комментария
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрытия модального окна

// Добавляем tabindex="0" для элемента bigPictureOpen
bigPictureOpen.setAttribute('tabindex', '0'); // Теперь элемент доступен для навигации с клавиатуры

// Функция для обработки нажатий клавиш на документе
const onDocumentKeydown = (evt) => {
  // Если нажата клавиша Escape, закрываем фото
  if (isEscapeKey(evt)) {
    evt.preventDefault(); // Предотвращаем стандартное поведение
    closePhoto(); // Закрываем фото
  }
};

// Функция для отображения фотографии
const showPhoto = (evt) => {
  // Находим элемент изображения, по которому кликнули
  const imgElement = evt.target.closest('.picture__img');
  if (!imgElement) return; // Если элемент не найден, выходим из функции

  // Получаем источник изображения и устанавливаем его в модальное окно
  const imgSrc = imgElement.getAttribute('src');
  bigPictureImg.src = imgSrc;
  bigPicture.classList.remove('hidden'); // Убираем класс скрытия
  document.body.classList.add('modal-open'); // Блокируем прокрутку страницы

  // Обновляем количество лайков
  const likesElement = imgElement.closest('.picture').querySelector('.picture__likes');
  if (likesElement) {
    likesCount.textContent = likesElement.textContent; // Устанавливаем количество лайков
  }

  // Генерируем комментарии
  const comments = generateComments(); // Генерируем комментарии
  renderComments(comments); // Отображаем комментарии

  // Добавляем tabindex="0" для элемента bigPictureClose
  bigPictureClose.setAttribute('tabindex', '0'); // Теперь элемент доступен для навигации с клавиатуры

  // Добавляем обработчики событий для закрытия модального окна
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureClose.addEventListener('click', closePhoto);
  bigPictureClose.addEventListener('keydown', onClosePhotoKeydown);
  bigPicture.addEventListener('click', onClosePhotoClick);
};

// Функция для отображения комментариев
const renderComments = (comments) => {
  // Очищаем предыдущие комментарии
  socialComments.innerHTML = '';

  // Обновляем счетчик комментариев
  const shownCount = comments.length; // Количество отображаемых комментариев
  const totalCount = 125; // Общее количество комментариев (можно изменить по необходимости)
  document.querySelector('.social__comment-shown-count').textContent = shownCount; // Обновляем отображаемое количество
  document.querySelector('.social__comment-total-count').textContent = totalCount; // Обновляем общее количество

  // Добавляем комментарии в разметку
  comments.forEach(comment => {
    const commentElement = socialCommentsTemplate.cloneNode(true); // Клонируем шаблон комментария
    const img = commentElement.querySelector('.social__picture'); // Находим элемент для изображения комментария
    const text = commentElement.querySelector('.social__text'); // Находим элемент для текста комментария

    // Устанавливаем данные комментария
    img.src = comment.avatar; // Устанавливаем аватар
    img.alt = comment.name; // Устанавливаем альтернативный текст
    text.textContent = comment.message; // Устанавливаем текст комментария

    // Добавляем комментарий в контейнер
    socialComments.appendChild(commentElement);
  });
};

// Функция для закрытия фотографии
const closePhoto = () => {
  bigPicture.classList.add('hidden'); // Добавляем класс скрытия
  document.body.classList.remove('modal-open'); // Разрешаем прокрутку страницы

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureClose.removeEventListener('click', closePhoto);
  bigPictureClose.removeEventListener('keydown', onClosePhotoKeydown);
  bigPicture.removeEventListener('click', onClosePhotoClick);
};

// Функция для обработки нажатий клавиш на кнопке закрытия
const onClosePhotoKeydown = (evt) => {
  // Если нажата клавиша Enter, закрываем фото
  if (isEnterKey(evt)) {
    closePhoto();
  }
};

// Функция для обработки клика вне изображения
const onClosePhotoClick = (evt) => {
  // Если кликнули на область модального окна, закрываем фото
  if (evt.target === bigPicture) {
    closePhoto();
  }
};

// Добавляем обработчики событий для открытия фото
bigPictureOpen.addEventListener('click', showPhoto);
bigPictureOpen.addEventListener('keydown', (evt) => {
  // Если нажата клавиша Enter, открываем фото
  if (isEnterKey(evt)) {
    showPhoto(evt);
  }
});

// Добавляем обработчики событий для открытия фото
bigPictureOpen.addEventListener('click', showPhoto);

// Добавляем обработчик события keydown непосредственно на bigPictureOpen
bigPictureOpen.addEventListener('keydown', (evt) => {
  // Если нажата клавиша Enter, открываем фото
  if (isEnterKey(evt)) {
    showPhoto(evt);
  }
});
