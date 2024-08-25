const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');


const createThumbnail = (photo) => {
  const thambnail = template.cloneNode(true);
  const image = thambnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;

  thambnail.querySelector('.picture__likes').textContent = photo.likes;
  thambnail.querySelector('.picture__comments').textContent = photo.comments.length;

  return thambnail;
};

// *======== Вариант с циклом for ========

/* for (let i = 0; i < MOCKED_PHOTOS.length; i++) {
  const photo = MOCKED_PHOTOS[i]; // Определяем photo как текущий элемент массива
  const thambnail = createThumbnail(photo);
  fragment.appendChild(thambnail);
};
container.appendChild(fragment); */

// *======== Вариант с for of ========

/* for (const photo of MOCKED_PHOTOS) {
  const thambnail = createThumbnail(photo);
  fragment.appendChild(thambnail);
};
container.appendChild(fragment); */


// *======== Вариант с forEach ========

const renderCards = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });
  container.appendChild(fragment);
};

export { renderCards }
