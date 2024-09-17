const socialCommentsTemplate = document.querySelector('.social__comment');
const socialComments = document.querySelector('.social__comments');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

let localComments;
let currentCommentIndex = 0;
const commentsPerPage = 5;

const createComment = ({ avatar, name, message }) => {
  const socialCommentElement = socialCommentsTemplate.cloneNode(true);
  const socialCommentAvatar = socialCommentElement.querySelector('.social__picture');
  socialCommentAvatar.src = avatar;
  socialCommentAvatar.alt = name;
  socialCommentElement.querySelector('.social__text').textContent = message;
  return socialCommentElement;
};

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
  if (shownCount >= localComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const loadMoreComments = () => {
  currentCommentIndex += commentsPerPage;
  renderComments();
};

const setLocalComments = (comments) => {
  localComments = comments;
  currentCommentIndex = 0;
  socialComments.innerHTML = '';
  renderComments();
};

export { renderComments, loadMoreComments, setLocalComments };
