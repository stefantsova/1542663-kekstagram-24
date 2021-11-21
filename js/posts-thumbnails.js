import { openModal, updateModalData } from './post-fullsize.js';
import { debounce } from './utils/debounce.js';

const RANDOM_POSTS_COUNT = 10;

let posts = [];

const renderedPosts = [];

let filteredPosts = [];

// Селекторы

const thumbnailsBlockElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postsFiltersElement = document.querySelector('.img-filters');
const postsFiltersButtons = document.querySelectorAll('.img-filters__button');

// Методы

const renderPosts = (postsToRender) => {
  renderedPosts.forEach((post) => {
    post.element.removeEventListener('click', post.clickHandler);
    post.element.remove();
  });

  const postsThumbnailsFragment = document.createDocumentFragment();

  postsToRender.forEach(({ url, description, likes, comments}) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('img').src = url;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;

    const caption = document.querySelector('.social__caption');
    caption.textContent = description;

    const onThumbnailClickHandler = () => {
      updateModalData(url, likes, comments);
      openModal();
    };

    thumbnailElement.addEventListener('click', onThumbnailClickHandler);

    postsThumbnailsFragment.appendChild(thumbnailElement);

    renderedPosts.push({ element: thumbnailElement, clickHandler: onThumbnailClickHandler });
  });

  thumbnailsBlockElement.appendChild(postsThumbnailsFragment);
};

const onGetPosts = (loadedPosts) => {
  posts = loadedPosts;
  renderPosts(posts);
};

const showThumbnailsFilters = () => {
  postsFiltersElement.classList.remove('img-filters--inactive');
};

const renderFilteredPosts = debounce(() => {
  renderPosts(filteredPosts);
});

const onChangePostsFilter = (postsFilterName) => {
  const activeFilterButton = postsFiltersElement.querySelector('.img-filters__button--active');
  const selectedFilterButton = postsFiltersElement.querySelector(`#${postsFilterName}`);

  activeFilterButton.classList.remove('img-filters__button--active');
  selectedFilterButton.classList.add('img-filters__button--active');

  let result = posts;

  if (postsFilterName === 'filter-random') {
    result = [...posts].sort(() => Math.random() - 0.5).slice(0, RANDOM_POSTS_COUNT);
  }

  if (postsFilterName === 'filter-discussed') {
    result = [...posts].sort((a, b) => b.comments.length - a.comments.length);
  }

  filteredPosts = result;

  renderFilteredPosts();
};

postsFiltersButtons.forEach((filterButton) => {
  filterButton.addEventListener('click', (evt) => {
    onChangePostsFilter(evt.target.id);
  });
});

export { showThumbnailsFilters, onGetPosts };


