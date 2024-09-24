// Находим шаблон и контейнер для комментариев
const socialCommentsTemplate = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');

// Элементы для отображения количества комментариев
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

// Переменные для работы с комментариями
let localComments;
let currentCommentIndex = 0;
const commentsPerPage = 5;

// Функция для создания комментария
const createComment = ({ avatar, name, message }) => {
  const socialCommentElement = socialCommentsTemplate.cloneNode(true);
  socialCommentElement.querySelector('.social__picture').src = avatar;
  socialCommentElement.querySelector('.social__text').textContent = message;
  return socialCommentElement;
};

// Функция для рендеринга комментариев
const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const commentsToShow = localComments.slice(currentCommentIndex, currentCommentIndex + commentsPerPage);

  commentsToShow.forEach((comment) => {
    fragment.append(createComment(comment));
  });

  socialComments.append(fragment);

  const shownCount = currentCommentIndex + commentsToShow.length;
  commentCount.querySelector('.social__comment-shown-count').textContent = shownCount;
  commentCount.querySelector('.social__comment-total-count').textContent = localComments.length;

  commentsLoader.classList.toggle('hidden', shownCount >= localComments.length);
};

// Функция для загрузки следующей порции комментариев
const loadMoreComments = () => {
  currentCommentIndex += commentsPerPage;
  renderComments();
};

// Функция для установки локального массива комментариев
const setLocalComments = (comments) => {
  localComments = comments;
  currentCommentIndex = 0;
  socialComments.innerHTML = '';
  renderComments();
};

// Экспортируем функции
export { renderComments, loadMoreComments, setLocalComments };
