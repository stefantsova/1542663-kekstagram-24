// Источник первой функции: MDN и помощь наставника :)

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

const checkCommentLength = (comment, maxLength) => comment.length <= maxLength;

getRandomIntInclusive(2,10);
checkCommentLength('Привет', 140);
