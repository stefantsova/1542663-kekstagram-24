const COMMENTS_COUNT_LIMIT = 5;

// Селекторы
const fullSizePostElement = document.querySelector('.big-picture');
const fullSizePictureElement = fullSizePostElement.querySelector('.big-picture__img');
const fullSizeLikesElement = fullSizePostElement.querySelector('.likes-count');
const fullSizeCommentsElement = fullSizePostElement.querySelector('.comments-count');
const fullSizePostCloseElement = fullSizePostElement.querySelector('.big-picture__cancel');
const commentsListElement = fullSizePostElement.querySelector('.social__comments');
const loadMoreCommentsButtonElement = fullSizePostElement.querySelector('.social__comments-loader');
const socialCommentsCountElement = fullSizePostElement.querySelector('.social__comment-count');

// Методы
const showLoadMoreCommentsButton = () => {
  loadMoreCommentsButtonElement.classList.remove('hidden');
};

const hideLoadMoreCommentsButton = () => {
  loadMoreCommentsButtonElement.classList.add('hidden');
};

const closeModal = () => {
  fullSizePostElement.classList.add('hidden');
  document.querySelector('body').classList.remove('.modal-open');
};

const openModal = () => {
  fullSizePostElement.classList.remove('hidden');
  document.querySelector('body').classList.add('.modal-open');

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closeModal();
    }
  });
};

let postComments = new Array();
let postCommentsTotal = 0;
let postCommentsShownCount = 0;

const loadComments = () => {
  const comments = postComments.splice(0,COMMENTS_COUNT_LIMIT);
  postCommentsShownCount += comments.length;
  socialCommentsCountElement.innerHTML = `${postCommentsShownCount} из <span class="comments-count">${postCommentsTotal}</span> комментариев`;

  if (postComments.length) {
    showLoadMoreCommentsButton();
  } else {
    hideLoadMoreCommentsButton();
  }

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

  commentsListElement.appendChild(modalComments);
};

const updateModalData = (url, likes, comments) => {
  postComments = comments;
  postCommentsTotal = comments.length;
  postCommentsShownCount = 0;

  fullSizePictureElement.querySelector('img').src = url;
  fullSizeLikesElement.textContent = likes;
  fullSizeCommentsElement.textContent = comments.length;

  const prevCommentsElements = commentsListElement.querySelectorAll('.social__comment');
  Array.from(prevCommentsElements).forEach((el) => {
    el.remove();
  });

  loadComments();
};

// Слушатели

loadMoreCommentsButtonElement.addEventListener('click', loadComments);

fullSizePostCloseElement.addEventListener('click', () => {
  closeModal();
});


export {openModal, updateModalData};
