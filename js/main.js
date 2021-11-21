import './form.js';
import './image-edit.js';
import { showThumbnailsFilters, onGetPosts } from './posts-thumbnails.js';
import { getPosts } from './api.js';

getPosts().then((posts) => {
  if (Array.isArray(posts)) {
    onGetPosts(posts);
    showThumbnailsFilters();
  }
});
