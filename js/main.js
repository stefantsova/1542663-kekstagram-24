import './form.js';
import './image-edit.js';
import { showThumbnailsFilters, getPostsHandler } from './posts-thumbnails.js';
import { getPosts } from './api.js';

getPosts().then((posts) => {
  if (Array.isArray(posts)) {
    getPostsHandler(posts);
    showThumbnailsFilters();
  }
});
