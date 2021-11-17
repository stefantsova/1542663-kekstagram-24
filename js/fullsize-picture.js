// Селекторы
const fullSizePost = document.querySelector('.big-picture');
const fullSizePicture = fullSizePost.querySelector('.big-picture__img');
const fullSizeLikes = fullSizePost.querySelector('.likes-count');
const fullSizeComments = fullSizePost.querySelector('.comments-count');
const fullSizePostClose = fullSizePost.querySelector('.big-picture__cancel');

const commentsListElement = document.querySelector('.social__comments');
// const defaultListElements = commentsListElement.querySelectorAll('.social__comment');

// Методы
const closeModal = () => {
  fullSizePost.classList.add('hidden');
  document.querySelector('body').classList.remove('.modal-open');
};

const openModal = () => {
  fullSizePost.classList.remove('hidden');
  fullSizePost.querySelector('.social__comment-count').classList.add('hidden');
  fullSizePost.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('.modal-open');

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeModal();
    }
  });
};

const updateModalData = (url, likes, comments) => {
  fullSizePicture.querySelector('img').src = url;
  fullSizeLikes.textContent = likes;
  fullSizeComments.textContent = comments.length;

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

  const prevCommentsElements = commentsListElement.querySelectorAll('.social__comment');
  Array.from(prevCommentsElements).forEach((el) => {
    el.remove();
  });
  commentsListElement.appendChild(modalComments);
};

// Слушатели

fullSizePostClose.addEventListener('click', () => {
  closeModal();
});


export {openModal, updateModalData};
