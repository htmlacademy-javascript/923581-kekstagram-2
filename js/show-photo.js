//* Импорт и выбор элементов
// Код начинается с импорта необходимых функций и выбора элементов DOM, которые будут использоваться для отображения большого изображения и комментариев.
//* Обработчики событий
// Основные функции showPhoto и closePhoto управляют открытием и закрытием модального окна.Они добавляют и удаляют обработчики событий для клавиатуры и кликов, обеспечивая интерактивность.
//* Генерация и отображение комментариев
// Функция renderComments отвечает за отображение комментариев, очищая предыдущие и добавляя новые, полученные из функции generateComments.
//* Закрытие модального окна
// Закрытие окна происходит как по клику на кнопку, так и по нажатию клавиш Escape или Enter, что делает интерфейс более удобным для пользователя.

//* Импорт и выбор элементов
// Импортируем необходимые функции для обработки нажатий клавиш и генерации комментариев
import { isEscapeKey, isEnterKey } from './util.js';
import { generateComments, DISCRIPTIONS } from './data.js'; // Импортируем массив описаний фотографий

// Получаем элементы DOM, которые будем использовать для отображения большого изображения и комментариев
const bigPicture = document.querySelector('.big-picture'); // Модальное окно для большой фотографии
const bigPictureOpen = document.querySelector('.pictures'); // Элемент, по которому открывается модальное окно
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // Изображение в модальном окне
const likesCount = bigPicture.querySelector('.likes-count'); // Элемент для отображения количества лайков
const socialComments = bigPicture.querySelector('.social__comments'); // Контейнер для комментариев
const socialCommentsTemplate = bigPicture.querySelector('.social__comment'); // Шаблон комментария
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel'); // Кнопка закрытия модального окна
const socialCaption = bigPicture.querySelector('.social__caption'); // Элемент для отображения описания фотографии

// Устанавливаем tabindex для элемента, чтобы он был доступен для навигации с клавиатуры
bigPictureOpen.setAttribute('tabindex', '0');

// Функция для обработки нажатий клавиш на документе
const onDocumentKeydown = (evt) => {
  // Проверяем, была ли нажата клавиша Escape или Enter
  if (isEscapeKey(evt) || isEnterKey(evt)) {
    evt.preventDefault(); // Предотвращаем стандартное поведение
    closePhoto(); // Закрываем модальное окно
  }
};

// Функция для отображения фотографии
const showPhoto = (evt) => {
  const imgElement = evt.target.closest('.picture__img'); // Находим элемент изображения, на который кликнули
  if (!imgElement) return; // Если элемент не найден, выходим из функции

  const imgSrc = imgElement.getAttribute('src'); // Получаем источник изображения
  bigPictureImg.src = imgSrc; // Устанавливаем источник для большого изображения
  bigPicture.classList.remove('hidden'); // Показываем модальное окно
  document.body.classList.add('modal-open'); // Блокируем прокрутку страницы

  const pictureElement = imgElement.closest('.picture'); // Находим родительский элемент с классом picture
  const likesElement = pictureElement.querySelector('.picture__likes'); // Получаем элемент с количеством лайков
  const commentsCountElement = pictureElement.querySelector('.picture__comments'); // Получаем элемент с количеством комментариев
  const pictureId = pictureElement.getAttribute('data-picture-id'); // Получаем идентификатор фотографии

  // Устанавливаем количество лайков
  if (likesElement) {
    likesCount.textContent = likesElement.textContent;
  }

  const totalCount = parseInt(commentsCountElement.textContent, 10); // Получаем общее количество комментариев
  const comments = generateComments(); // Генерируем случайные комментарии

  // Проверяем, есть ли комментарии для отображения
  if (comments.length === 0) {
    console.warn('Нет комментариев для отображения');
    return; // Если комментариев нет, выходим из функции
  }

  renderComments(comments, totalCount); // Отображаем комментарии

  // Получаем описание из массива фотографий по pictureId
  const photoDescription = getPhotoDescriptionById(pictureId);
  socialCaption.textContent = photoDescription; // Устанавливаем описание в элемент socialCaption

  // Добавляем обработчики событий
  document.addEventListener('keydown', onDocumentKeydown); // Обработка нажатий клавиш
  bigPictureClose.addEventListener('click', closePhoto); // Закрытие модального окна по клику на кнопку
  bigPictureClose.addEventListener('keydown', onClosePhotoKeydown); // Закрытие модального окна по нажатию клавиши на кнопке
  bigPicture.addEventListener('click', onClosePhotoClick); // Закрытие модального окна по клику вне изображения
};

// Функция для получения описания фотографии по ID
const getPhotoDescriptionById = (id) => {
  const photoIndex = parseInt(id, 10) - 1; // Преобразуем id в индекс массива (id начинается с 1, а массив с 0)
  return DISCRIPTIONS[photoIndex] || ''; // Возвращаем описание или пустую строку, если индекс выходит за пределы массива
};

// Функция для отображения комментариев
const renderComments = (comments, totalCount) => {
  const fragment = document.createDocumentFragment(); // Создаем фрагмент для оптимизации работы с DOM
  socialComments.innerHTML = ''; // Очищаем контейнер для комментариев перед добавлением новых

  const shownCount = comments.length; // Количество отображаемых комментариев

  // Устанавливаем ограничение на shownCount
  const displayedCount = Math.min(shownCount, totalCount); // Устанавливаем displayedCount как минимум из shownCount и totalCount

  // Обновляем отображаемое количество комментариев
  document.querySelector('.social__comment-shown-count').textContent = displayedCount;
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
  bigPicture.classList.add('hidden'); // Скрываем модальное окно
  document.body.classList.remove('modal-open'); // Разблокируем прокрутку страницы

  // Удаляем обработчики событий
  document.removeEventListener('keydown', onDocumentKeydown); // Удаляем обработчик нажатий клавиш
  bigPictureClose.removeEventListener('click', closePhoto); // Удаляем обработчик клика на кнопку закрытия
  bigPictureClose.removeEventListener('keydown', onClosePhotoKeydown); // Удаляем обработчик нажатий клавиш на кнопке закрытия
  bigPicture.removeEventListener('click', onClosePhotoClick); // Удаляем обработчик клика вне изображения
};

// Функция для обработки нажатий клавиш на кнопке закрытия
const onClosePhotoKeydown = (evt) => {
  if (isEnterKey(evt)) {
    closePhoto(); // Закрываем модальное окно при нажатии Enter
  }
};

// Функция для обработки клика вне изображения
const onClosePhotoClick = (evt) => {
  if (evt.target === bigPicture) {
    closePhoto(); // Закрываем модальное окно, если кликнули на область модального окна
  }
};

// Добавляем обработчики событий для открытия фото
bigPictureOpen.addEventListener('click', showPhoto); // Открытие модального окна по клику
bigPictureOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    showPhoto(evt); // Открытие модального окна при нажатии Enter
  }
});
