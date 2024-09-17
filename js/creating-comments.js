// Находим шаблон для комментариев и контейнер для комментариев в HTML
const socialCommentsTemplate = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');

// Находим элементы для отображения количества комментариев
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

// Инициализируем переменные для работы с комментариями
let localComments;
let currentCommentIndex = 0;
const commentsPerPage = 5;

// Функция для создания комментария
const createComment = ({ avatar, name, message }) => {
  // Клонируем шаблон комментария
  const socialCommentElement = socialCommentsTemplate.cloneNode(true);

  // Находим элемент аватара и устанавливаем его значения
  const socialCommentAvatar = socialCommentElement.querySelector('.social__picture');
  socialCommentAvatar.src = avatar;
  socialCommentAvatar.alt = name;

  // Находим элемент текста комментария и устанавливаем его значение
  socialCommentElement.querySelector('.social__text').textContent = message;

  // Возвращаем созданный комментарий
  return socialCommentElement;
};

// Функция для рендеринга комментариев
const renderComments = () => {
  // Создаем фрагмент документа для оптимизации рендеринга
  const fragment = document.createDocumentFragment();

  // Получаем массив комментариев, которые нужно показать на текущей странице
  const commentsToShow = localComments.slice(currentCommentIndex, currentCommentIndex + commentsPerPage);

  // Создаем и добавляем каждый комментарий в фрагмент
  commentsToShow.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  // Добавляем фрагмент с комментариями в контейнер
  socialComments.append(fragment);

  // Обновляем информацию о количестве показанных комментариев
  const shownCount = currentCommentIndex + commentsToShow.length;
  commentCount.querySelector('.social__comment-shown-count').textContent = shownCount;
  commentCount.querySelector('.social__comment-total-count').textContent = localComments.length;

  // Скрываем кнопку "Загрузить еще", если показаны все комментарии
  if (shownCount >= localComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

// Функция для загрузки следующей порции комментариев
const loadMoreComments = () => {
  currentCommentIndex += commentsPerPage;
  renderComments();
};

// Функция для установки локального массива комментариев
const setLocalComments = (comments) => {
  // Сохраняем массив комментариев
  localComments = comments;

  // Сбрасываем индекс текущего комментария и очищаем контейнер для комментариев
  currentCommentIndex = 0;
  socialComments.innerHTML = '';

  // Рендерим комментарии
  renderComments();
};

// Экспортируем функции для использования в других модулях
export { renderComments, loadMoreComments, setLocalComments };
