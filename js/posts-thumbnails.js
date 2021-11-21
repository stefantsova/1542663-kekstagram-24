import { openModal, updateModalData } from './post-fullsize.js';

// Селекторы

const picturesBlockElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPosts = (similarPictures) => {
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
};

export { renderPosts };


