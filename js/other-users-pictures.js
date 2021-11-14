import {createPostComments, createPosts} from './data.js';
import {openModal, updateModalData} from './fullsize-picture.js';

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = createPosts(19);

const similarFragment = document.createDocumentFragment();

similarPictures.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  const caption = document.querySelector('.social__caption');
  caption.textContent = description;

  pictureElement.addEventListener('click', () => {
    updateModalData(url, likes, comments);
    openModal();
  });

  similarFragment.appendChild(pictureElement);
});

picturesBlock.appendChild(similarFragment);

const postComments = createPostComments();
const commentsList = document.querySelector('.social__comments');

postComments.forEach((postComment) => {
  const newListElement = document.createElement('li');
  newListElement.classList.add('social__comment');
  newListElement.innerHTML = `<img class="social__picture" src="${postComment.avatar}" alt="${postComment.name}"><p class="social__text">${postComment.message} + '</p>`;
  commentsList.appendChild(newListElement);
});

export {similarPictures};
