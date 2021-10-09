const PHOTO_DESCRIPTIONS_COUNT = 25;

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

const getRandomIntInclusive = (min, max) => {
  if (min >= 0 && max >=0) {
    if (min > max) {
      const oldMin = min;
      min = max;
      max = oldMin;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const createCommentDescription = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
  message: MESSAGES[getRandomIntInclusive(0, (MESSAGES.length - 1))],
  name: NAMES[getRandomIntInclusive(0, (NAMES.length - 1))],
});

const createPhotoDescription = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: 'Тут будет описание фотографии',
  likes: getRandomIntInclusive(15, 200),
  comments: new Array(3).fill(null).map((_, commentIndex) => createCommentDescription(index*10 + commentIndex + 1)),
});

const photoDescriptions = new Array(PHOTO_DESCRIPTIONS_COUNT).fill(null).map((_, index) => createPhotoDescription(index));
