/**
 * Случайное целое, в диапазоне, включительно
 * @param {number} min - Значение от
 * @param {number} max - Значение до
 */
const getRandomPositiveInteger = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw new Error('Один из аргументов не число.');
  }

  if (min < 0 || max < 0) {
    throw new Error('Один из аргументов меньше нуля.');
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    const oldMin = min;
    min = max;
    max = oldMin;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export {getRandomPositiveInteger};
