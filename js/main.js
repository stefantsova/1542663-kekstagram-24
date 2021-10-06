// Источник первой функции: MDN и помощь наставника :)

function getRandomIntInclusive(min, max) {
  if (min > max) {
    const oldMin = min;
    min = max;
    max = oldMin;
  }
  if (min >= 0 && max >=0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

function checkCommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

getRandomIntInclusive(2,10);
checkCommentLength('Привет', 140);
