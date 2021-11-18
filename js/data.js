import { getRandomPositiveInteger } from './utils/get-random-positive-integer.js';
import { getNextRandomInteger } from './utils/get-next-random-integer.js';

// -------------------------------------------
// Константы
// -------------------------------------------

const POSTS_COUNT = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const getNextCommentId = getNextRandomInteger();

// -------------------------------------------
// Конструкторы
// -------------------------------------------

/**
 * Описание фотографии
 * @param {number} id - Уникальный идентфикатор
 * @param {string} url - Уникальный идентфикатор
 * @param {string} description - Уникальный идентфикатор
 * @param {number} likes - Уникальный идентфикатор
 * @param {PhotoComment[]} comments - Уникальный идентфикатор
 */
function Post(id, url, description, likes, comments) {
  this.id = id;
  this.url = url;
  this.description = description;
  this.likes = likes;
  this.comments = comments;
}

/**
 * Комментарий
 * @param {number} id - Уникальный идентфикатор комментария
 * @param {string} avatar - Аватар комментатора
 * @param {string} message - Сообщение
 * @param {string} name - Имя комментатора
 */
function PostComment(id, avatar, message, name) {
  this.id = id;
  this.avatar = avatar;
  this.message = message;
  this.name = name;
}

// -------------------------------------------
// Генераторы
// -------------------------------------------

/**
 * Генератор сообщения
 * Вовзращает сообщение из одной или двух случайных строк
 */
const createCommentMessage = () => MESSAGES.sort(() => Math.random() - 0.5).slice(0, getRandomPositiveInteger(1, 2)).join(' ');

/**
 * Генератор комментариев
 */
const createPostComments = () => {
  const commentsCount = getRandomPositiveInteger(4,12);
  return new Array(commentsCount).fill(null).map(() => {
    const id = getNextCommentId();
    const avatar = `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`;
    const message = createCommentMessage();
    const name = NAMES[getRandomPositiveInteger(0, (NAMES.length - 1))];

    return new PostComment(id, avatar, message, name);
  });
};

/**
 * Генератор постов
 * @param {number} postsCount - Количество постов
 */
const createPosts = (postsCount = 1) => new Array(postsCount)
  .fill(null)
  .map((_, index) => {
    const id = index + 1;
    const url = `photos/${index + 1}.jpg`;
    const description = 'Тут будет описание фотографии';
    const likes = getRandomPositiveInteger(15, 200);
    const comments = createPostComments();

    return new Post(id, url, description, likes, comments);
  });

export { POSTS_COUNT, createPosts };
