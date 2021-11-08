import {getRandomPositiveInteger} from './get-random-positive-integer.js';

/**
 * Генератор случайного целого числа, со случайным шагом
 * @param {number} [maxStep] - Максимальный шаг
 */
const getNextRandomInteger = function (maxStep = 5) {
  let currentNumber = 0;

  return function() {
    currentNumber += getRandomPositiveInteger(1, maxStep);
    return currentNumber;
  };
};

export {getNextRandomInteger};
