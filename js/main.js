import './form.js';
import './image-edit.js';
import { renderPosts } from './posts-thumbnails.js';
import { getPosts } from './api.js';

getPosts().then((pictures) => {
  if (Array.isArray(pictures)) {
    renderPosts(pictures);
  }
});
