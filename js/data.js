// import { MESSAGES, NAMES, DISCRIPTIONS, Ranges } from './constants.js';
import { getRandomInt, getRandomElement } from './util.js';

const generateComments = () => {
  const commentsCount = getRandomInt(Ranges.COMMENTS.MIN, Ranges.COMMENTS.MAX);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push({
      id: i + 1,
      avatar: `img/avatar-${getRandomInt(Ranges.AVATARS.MIN, Ranges.AVATARS.MAX)}.svg`,
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES)
    });
  }

  return comments;
};

// const generatePhotos = () => {
//   const photos = [];

//   for (let i = Ranges.PHOTOS.MIN; i <= Ranges.PHOTOS.MAX; i++) {
//     const avatarIndex = getRandomInt(Ranges.AVATARS.MIN, Ranges.AVATARS.MAX);
//     photos.push({
//       id: i,
//       url: `photos/${i}.jpg`,
//       description: DISCRIPTIONS[i - 1],
//       likes: getRandomInt(Ranges.LIKES.MIN, Ranges.LIKES.MAX),
//       comments: generateComments(),
//       avatar: `img/avatar-${avatarIndex}.svg`,
//       avatarAlt: `Аватар автора фотографии ${getRandomElement(NAMES)}`
//     });
//   }

//   return photos;
// };

export { generatePhotos };
