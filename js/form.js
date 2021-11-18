const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;

const bodyElement = document.querySelector('body');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgEditFormElement = document.querySelector('.img-upload__overlay');
const imgInputElement = imgUploadFormElement.querySelector('input[type="file"]');
const imgEditFormElementClose = imgEditFormElement.querySelector('.img-upload__cancel');
const hashtagsInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const imgDescriptionInputElement = imgUploadFormElement.querySelector('.text__description');

// Методы

const closeimgEditFormElement = () => {
  imgEditFormElement.classList.add('hidden');
  bodyElement.classList.remove('.modal-open');
  imgInputElement.value = '';

  document.removeEventListener('keydown', formKeydownHandler);
};

function formKeydownHandler (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closeimgEditFormElement();
  }
}

const onUploadFileChange = () => {
  imgEditFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', formKeydownHandler);

  imgEditFormElementClose.addEventListener('click', () => {
    closeimgEditFormElement(formKeydownHandler);
  });
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
