// Импорт функций
// Импортируются функции, которые помогут определить, была ли нажата клавиша Escape или Enter, а также функции для работы с комментариями.
// Получение элементов
// Код получает доступ к различным элементам модального окна, чтобы впоследствии изменять их содержимое и управлять отображением.
// Обработка нажатий клавиш
// Функция onDocumentKeydown обрабатывает нажатия клавиш и закрывает модальное окно при нажатии клавиш Escape или Enter.
// Отображение модального окна
// Функция renderModal устанавливает содержимое модального окна, включая изображение, описание, количество лайков и комментарии.
// Показ модального окна
// Функция showModal делает модальное окно видимым и блокирует прокрутку страницы.
// Открытие модального окна
// Функция openModal открывает модальное окно, устанавливает локальные комментарии и добавляет обработчики событий для загрузки дополнительных комментариев и закрытия окна.
// Закрытие модального окна
// Функция closeModal скрывает модальное окно и удаляет все обработчики событий, чтобы избежать утечек памяти.
// Обработка событий закрытия
// Функции onClosePhotoKeydown и onClosePhotoClick обрабатывают закрытие модального окна при нажатии клавиши Enter или клике вне изображения.

//* Импорт функций
// Импортируем функции isEscapeKey и isEnterKey из модуля util.js.
// Эти функции определяют, была ли нажата клавиша Escape или Enter соответственно.
// Это позволяет обрабатывать нажатия клавиш для закрытия модального окна.
import { isEscapeKey, isEnterKey } from './util.js';
// импортируем три функции из модуля comments.js.
// renderComments: Эта функция отвечает за отображение комментариев в модальном окне. Она может принимать данные о комментариях и динамически создавать элементы DOM для их отображения. Например, она может добавлять комментарии в список, который находится в модальном окне.
// loadMoreComments: Эта функция используется для загрузки дополнительных комментариев, когда пользователь нажимает кнопку "Загрузить больше комментариев". Она может извлекать следующие комментарии из массива локальных комментариев или из какого-то внешнего источника (например, сервера) и добавлять их в отображение.
// setLocalComments: Эта функция используется для установки или обновления списка локальных комментариев. Она может принимать массив комментариев и сохранять его в переменной, чтобы другие функции могли использовать эти данные для отображения или обработки.
import { renderComments, loadMoreComments, setLocalComments } from './comments.js';

// Получаем элементы модального окна
// Сохраняем ссылки на различные элементы модального окна, такие как изображение, описание, количество лайков и комментариев, а также кнопку закрытия.
const bigPicture = document.querySelector('.big-picture'); // Модальное окно
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // Изображение в модальном окне
const socialCaption = bigPicture.querySelector('.social__caption'); // Описание изображения
const socialHeader = bigPicture.querySelector('.social__header'); // Заголовок с информацией о пользователе
const socialHeaderPicture = socialHeader.querySelector('.social__picture'); // Аватар пользователя
const likesCount = bigPicture.querySelector('.likes-count'); // Количество лайков
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрытия модального окна
const socialCommentsTemplate = bigPicture.querySelector('.social__comment'); // Шаблон комментария
const socialComments = bigPicture.querySelector('.social__comments'); // Список комментариев
const commentCount = bigPicture.querySelector('.social__comment-count'); // Количество комментариев
const commentsLoader = bigPicture.querySelector('.comments-loader'); // Кнопка загрузки дополнительных комментариев

let localComments; // Переменная для хранения локальных комментариев
let currentCommentIndex = 0; // Индекс текущего комментария
const commentsPerPage = 5; // Количество комментариев, загружаемых за раз

//* Обработка нажатий клавиш
// Функция onDocumentKeydown обрабатывает нажатия клавиш.
// Закрывает модальное окно, если нажата клавиша Escape или Enter.
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) || isEnterKey(evt)) {
    evt.preventDefault(); // Предотвращаем действие по умолчанию
    closeModal(); // Закрываем модальное окно
  }
};

// Функция для управления видимостью кнопки загрузки комментариев
const toggleCommentsLoaderVisibility = (shownCount, totalComments) => {
  if (shownCount >= totalComments) {
    commentsLoader.classList.add('hidden'); // Скрываем кнопку, если все комментарии загружены
  } else {
    commentsLoader.classList.remove('hidden'); // Показываем кнопку, если есть еще комментарии для загрузки
  }
};

//* Отображение модального окна
// Функция renderModal устанавливает изображение, описание и количество лайков, а также вызывает функцию для отображения комментариев.
const renderModal = ({ url, description, likes, avatar, avatarAlt }) => {
  bigPictureImg.src = url; // Устанавливаем источник изображения
  socialCaption.textContent = description; // Устанавливаем текст описания
  likesCount.textContent = likes; // Устанавливаем количество лайков
  socialHeaderPicture.src = avatar; // Устанавливаем аватар автора
  socialHeaderPicture.alt = avatarAlt; // Устанавливаем альтернативный текст для аватара
  currentCommentIndex = 0; // Сбрасываем индекс комментариев
  socialComments.innerHTML = ''; // Очищаем список комментариев
  renderComments(); // Вызываем функцию для отображения комментариев
};

//* Показ модального окна
// Функция showModal убирает класс 'hidden' с модального окна и блокирует прокрутку страницы.
const showModal = () => {
  bigPicture.classList.remove('hidden'); // Показываем модальное окно
  document.body.classList.add('modal-open'); // Блокируем прокрутку страницы
  bigPictureClose.tabIndex = 2; // Устанавливаем tabindex для кнопки закрытия
  bigPicture.tabIndex = 1; // Устанавливаем tabindex для модального окна
  bigPicture.focus(); // Устанавливаем фокус на модальное окно
};

//* Открытие модального окна
// Функция openModal открывает модальное окно, копируя комментарии и добавляя обработчики событий для закрытия окна.
export const openModal = (photo) => {
  setLocalComments([...photo.comments]); // Устанавливаем локальные комментарии
  renderModal({
    url: photo.url,
    description: photo.description,
    likes: photo.likes,
    avatar: photo.avatar,
    avatarAlt: photo.avatarAlt
  });
  showModal();

  // Добавляем обработчики событий для загрузки дополнительных комментариев и закрытия окна
  commentsLoader.addEventListener('click', loadMoreComments);
  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureClose.addEventListener('click', closeModal);
  bigPictureClose.addEventListener('keydown', onClosePhotoKeydown);
  bigPicture.addEventListener('click', onClosePhotoClick);
};

//* Закрытие модального окна
// Функция closeModal скрывает модальное окно и удаляет обработчики событий.
const closeModal = () => {
  bigPicture.classList.add('hidden'); // Скрываем модальное окно
  document.body.classList.remove('modal-open'); // Разрешаем прокрутку страницы

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureClose.removeEventListener('click', closeModal);
  bigPicture.removeEventListener('click', onClosePhotoClick);
};

//* Обработка событий закрытия
// Функция onClosePhotoKeydown обрабатывает нажатия клавиш для закрытия модального окна при нажатии клавиши Enter.
const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closeModal(); // Закрываем модальное окно
  }
};

// Функция onClosePhotoClick обрабатывает закрытие модального окна при клике вне изображения.
const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) {
    closeModal(); // Закрываем модальное окно
  }
};
