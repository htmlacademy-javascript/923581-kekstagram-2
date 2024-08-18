
import { MESSAGES, NAMES, DISCRIPTIONS, Ranges } from './constants.js';
import { getRandomInt, getRandomElement } from './util.js';

//*  ======================== Генерация массивов с фото, описанием и комментариями ========================

// Создаем массив комментариев со случайными сообщениями и именами
const generateComments = () => {

  const commentsCount = getRandomInt(Ranges.COMMENTS.MIN, Ranges.COMMENTS.MAX);
  const comments = [];


  for (let i = 0; i < commentsCount; i++) {
    comments.push({
      id: i + 1, // Идентификатор комментария
      avatar: `img/avatar-${getRandomInt(Ranges.AVATARS.MIN, Ranges.AVATARS.MAX)}.svg`, // Аватарка
      message: getRandomElement(MESSAGES), // Сообщение
      name: getRandomElement(NAMES) // Имя
    });
  }

  return comments;
};

// Создаем массив фотографий со случайными описаниями фото, списком комментариев и лайками.
const generatePhotos = () => {
  const photos = [];

  for (let i = Ranges.PHOTOS.MIN; i <= Ranges.PHOTOS.MAX; i++) {
    photos.push({
      id: i, // Идентификатор фотографии
      url: `photos/${i}.jpg`, // URL фотографии
      description: DISCRIPTIONS[i - 1], // Описание
      likes: getRandomInt(Ranges.LIKES.MIN, Ranges.LIKES.MAX), // Количество лайков
      comments: generateComments() // Список комментариев
    });
  }

  return photos;
};

export { generatePhotos };
