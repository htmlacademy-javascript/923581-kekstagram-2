const template = document.querySelector('#picture').content.querySelector('.picture');
const bigPictureNode = document.querySelector('.pictures');

const createThumbnail = (photo) => {
  const thumbnail = template.cloneNode(true); // Исправлено на thumbnail
  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments ? photo.comments.length : 0; // Проверка на наличие комментариев: Если photo.comments может быть undefined, стоит добавить проверку, чтобы избежать ошибок.

  return thumbnail;
};

const renderCards = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    thumbnail.dataset.pictureId = photo.id; // Используем photo.id вместо id
    
    fragment.appendChild(thumbnail);
  });
  bigPictureNode.appendChild(fragment);
};

export { renderCards };
