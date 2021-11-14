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
};

export {openModal, updateModalData};
