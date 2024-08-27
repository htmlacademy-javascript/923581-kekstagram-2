import { isEscapeKey, isEnterKey } from './util.js';
import { generateComments } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureOpen = document.querySelector('.pictures');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsTemplate = bigPicture.querySelector('.social__comment');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhoto();
  }
};

const showPhoto = (evt) => {
  if (evt.target.closest('.picture__img')) {
    const imgSrc = evt.target.getAttribute('src'); // Получаем путь к изображению
    bigPictureImg.src = imgSrc; // Устанавливаем источник изображения
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentKeydown);

    // Обновляем количество лайков
    const likesElement = evt.target.closest('.picture').querySelector('.picture__likes');
    if (likesElement) {
      likesCount.textContent = likesElement.textContent;
    }

    // Генерируем комментарии
    const comments = generateComments();
    renderComments(comments);

  }
};

// Функция для отображения комментариев
const renderComments = (comments) => {
  // Очищаем предыдущие комментарии
  socialComments.innerHTML = '';

  // Обновляем счетчик комментариев
  const shownCount = comments.length;
  const totalCount = 125; // Общее количество комментариев (можно изменить по необходимости)
  document.querySelector('.social__comment-shown-count').textContent = shownCount;
  document.querySelector('.social__comment-total-count').textContent = totalCount;

  // Добавляем комментарии в разметку
  comments.forEach(comment => {
    const commentElement = socialCommentsTemplate.cloneNode(true);
    const img = commentElement.querySelector('.social__picture');
    const text = commentElement.querySelector('.social__text');

    img.src = comment.avatar;
    img.alt = comment.name;
    text.textContent = comment.message;

    socialComments.appendChild(commentElement);
  });
};


//  ==============================================

function closePhoto() {
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureOpen.addEventListener('click', (evt) => {
  showPhoto(evt);
});

bigPictureOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    showPhoto(evt);
  }
});

bigPictureClose.addEventListener('click', () => {
  closePhoto();
});

bigPictureClose.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closePhoto();
  }
});




