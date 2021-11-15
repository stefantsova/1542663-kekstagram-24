import './other-users-pictures.js';

const fullSizePost = document.querySelector('.big-picture');

const fullSizePicture = fullSizePost.querySelector('.big-picture__img');
const fullSizeLikes = fullSizePost.querySelector('.likes-count');
const fullSizeComments = fullSizePost.querySelector('.comments-count');

const openModal = function () {
  fullSizePost.classList.remove('hidden');
  fullSizePost.querySelector('.social__comment-count').classList.add('hidden');
  fullSizePost.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('.modal-open');
};

const closeModal = function () {
  fullSizePost.classList.add('hidden');
  document.querySelector('body').classList.remove('.modal-open');
};

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
});

const fullSizePostClose = fullSizePost.querySelector('.big-picture__cancel');

fullSizePostClose.addEventListener('click', () => {
  closeModal();
});

const updateModalData = function (url, likes, comments) {
  fullSizePicture.querySelector('img').src = url;
  fullSizeLikes.textContent = likes;
  fullSizeComments.textContent = comments.length;

  const commentsList = document.querySelector('.social__comments');
  const defaultListElements = commentsList.querySelectorAll('.social__comment');

  Array.from(defaultListElements).forEach((el) => {el.remove();});

  const modalComments = document.createDocumentFragment();

  comments.forEach((comment) => {
    const socialCommentElement = document.createElement('li');
    socialCommentElement.classList.add('social__comment');

    socialCommentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}">
      <p class="social__text">${comment.message}</p>
    `;

    modalComments.appendChild(socialCommentElement);
  });

  commentsList.appendChild(modalComments);
};

export {openModal, updateModalData};
