/**
 * Удаление класса по префиксу
 * @param {HTMLElement} element
 * @param {strings} prefix
 */
const removeClassByPrefix = (element, prefix) => {
  const re = new RegExp(`\\b${prefix}[^ ]*[ ]?\\b`, 'g');
  element.className = element.className.replace(re, '');
  return element;
};

export default removeClassByPrefix;
