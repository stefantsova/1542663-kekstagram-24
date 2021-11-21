import { sendPost } from './api.js';
import {
  SCALE_SIZE_DEFAULT,
  DEFAULT_EFFECT_LEVEL_VALUE,
  changeScaleValue,
  resetImgEffectClass,
  setEffectLevelValue
} from './image-edit.js';
import { showMessage } from './show-message.js';

const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;

const bodyElement = document.querySelector('body');

/** @type {HTMLFormElement} */
const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgEditFormElement = document.querySelector('.img-upload__overlay');
const imgInputElement = imgUploadFormElement.querySelector('input[type="file"]');
const imgEditFormElementClose = imgEditFormElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const imgDescriptionInputElement = imgUploadFormElement.querySelector('.text__description');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

// Методы

const closeimgEditFormElement = () => {
  imgEditFormElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  imgInputElement.value = '';

  document.removeEventListener('keydown', formCloseKeydownHandler);
};


const clearForm = () => {
  changeScaleValue(SCALE_SIZE_DEFAULT);
  const {effect, hashtags, description} = imgUploadFormElement.elements;
  effect.value = 'none';
  setEffectLevelValue(DEFAULT_EFFECT_LEVEL_VALUE);
  hashtags.value = '';
  description.value = '';
  resetImgEffectClass();
};

function formCloseKeydownHandler (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeimgEditFormElement();
    imgUploadFormElement.reset();
    clearForm();
  }
}

function formCloseClickHandler () {
  closeimgEditFormElement();
  imgUploadFormElement.reset();
  clearForm();
}

const showSuccessMessage = () => {
  showMessage(successMessageTemplate);
};

const showErrorMessage = () => {
  showMessage(errorMessageTemplate);
};

const onUploadFileChange = () => {
  imgEditFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', formCloseKeydownHandler);

  imgEditFormElementClose.addEventListener('click', formCloseClickHandler);
};

// События

imgInputElement.addEventListener('change', onUploadFileChange);

hashtagsInputElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.stopPropagation();
  }
});

hashtagsInputElement.addEventListener('input', (evt) => {
  const hashtags = evt.target.value.split(' ').filter((tag) => tag !== '');

  let isHashtagsValid = true;

  isHashtagsValid = hashtags.every((hashtag) => {
    if (!hashtag.startsWith('#')) {
      evt.target.setCustomValidity('Хэштег должен начинаться с #');
      return false;
    }

    if (hashtag.length < MIN_HASHTAG_LENGTH) {
      evt.target.setCustomValidity('Хэштег должен состоять минимум из 2 символов');
      return false;
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      evt.target.setCustomValidity('Хэштег должен состоять максимум из 20 символов');
      return false;
    }

    if (!hashtag.substring(1).match(/^[\p{Alpha}\p{Nd}]+$/giu)) {
      evt.target.setCustomValidity('Хэштег должен состоять только из букв и цифр');
      return false;
    }
    return true;
  });

  if (hashtags.length > 1 && isHashtagsValid) {
    const uniqueValues = new Set(hashtags.map((hashtag) => hashtag.toLowerCase()));
    const isNonUniqueTags = hashtags.length > uniqueValues.size;

    if (isNonUniqueTags) {
      evt.target.setCustomValidity('Хэштеги не должны повторяться');
      isHashtagsValid = false;
    }
  }

  if (hashtags.length > 5 && isHashtagsValid) {
    evt.target.setCustomValidity('Хэштегов не должно быть больше пяти');
    isHashtagsValid = false;
  }

  if (isHashtagsValid) {
    evt.target.setCustomValidity('');
  }

  hashtagsInputElement.reportValidity();
});

imgDescriptionInputElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.stopPropagation();
  }
});

imgDescriptionInputElement.addEventListener('input', (evt) => {
  const description = evt.target.value;
  let isDescriptionValid = true;

  if (description.length > 140) {
    evt.target.setCustomValidity('Максимум 140 символов');
    isDescriptionValid = false;
  }

  if (isDescriptionValid) {
    evt.target.setCustomValidity('');
  }

  evt.target.reportValidity();
});

imgUploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  /** @type HTMLFormElement */
  const formElement = evt.target;

  const {action, method} = formElement;
  const formData = new FormData(formElement);

  sendPost(action, method, formData)
    .then((response) => {
      closeimgEditFormElement();

      if (response.ok) {
        clearForm();
        formElement.reset();
        showSuccessMessage();
      } else {
        showErrorMessage();
      }
    });
});


clearForm();
