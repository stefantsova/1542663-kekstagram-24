/**
 * Удаление класса по префиксу
 * @param {HTMLElement} element
 * @param {strings} prefix
 */
const removeClassByPrefix = (element, prefix) => {
  const re = new RegExp(`\\b${prefix}[^ ]*[ ]?\\b`, 'g');
  const currentClass = element.getAttribute('class') ?? '';
  element.setAttribute('class', currentClass.replace(re, ''));
  return element;
};

export default removeClassByPrefix;
