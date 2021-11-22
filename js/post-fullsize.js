const COMMENTS_COUNT_LIMIT = 5;

// Селекторы
const fullSizePostElement = document.querySelector('.big-picture');
const fullSizePictureElement = fullSizePostElement.querySelector('.big-picture__img');
const fullSizeLikesElement = fullSizePostElement.querySelector('.likes-count');
const fullSizeCommentsElement = fullSizePostElement.querySelector('.comments-count');
const fullSizePostCloseElement = fullSizePostElement.querySelector('.big-picture__cancel');
const commentsListElement = fullSizePostElement.querySelector('.social__comments');
const loadMoreCommentsButton = fullSizePostElement.querySelector('.social__comments-loader');
const socialCommentsCountElement = fullSizePostElement.querySelector('.social__comment-count');

// Методы
const showLoadMoreCommentsButton = () => {
  loadMoreCommentsButton.classList.remove('hidden');
};

const hideLoadMoreCommentsButton = () => {
  loadMoreCommentsButton.classList.add('hidden');
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

let postComments = [];
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

    const socialAvatarElement = document.createElement('img');
    socialAvatarElement.classList.add('social__picture');
    socialAvatarElement.src = comment.avatar;
    socialAvatarElement.alt = comment.name;
    socialCommentElement.append(socialAvatarElement);

    const socialText = document.createElement('p');
    socialText.classList.add('social__text');
    socialText.textContent = comment.message;
    socialCommentElement.append(socialText);

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

const loadMoreCommentsButtonClickHandler = () => {
  loadComments();
};

// Слушатели

loadMoreCommentsButton.addEventListener('click', loadMoreCommentsButtonClickHandler);

fullSizePostCloseElement.addEventListener('click', () => {
  closeModal();
});


export {openModal, updateModalData};
