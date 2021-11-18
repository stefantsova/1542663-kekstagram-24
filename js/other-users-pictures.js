import { createPosts, POSTS_COUNT } from './data.js';
import { openModal, updateModalData } from './fullsize-picture.js';

// Селекторы

const picturesBlockElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = createPosts(POSTS_COUNT);

const similarFragment = document.createDocumentFragment();

similarPictures.forEach(({ url, description, likes, comments}) => {
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

picturesBlockElement.appendChild(similarFragment);
