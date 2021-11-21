import clampNumber from './utils/clamp-number.js';
import removeClassByPrefix from './utils/remove-class-by-prefix.js';

const SCALE_SIZE_STEP = 25;
const SCALE_SIZE_MIN = 25;
const SCALE_SIZE_MAX = 100;
const SCALE_SIZE_DEFAULT = 100;

const DEFAULT_EFFECT_LEVEL_VALUE = 0;

const EFFECT_CLASS_PREFIX = 'effects__preview--';

const EffectFilters = {
  chrome: {filter: 'grayscale', min: 0, max: 1, step: 0.1},
  sepia: {filter: 'sepia', min: 0, max: 1, step: 0.1},
  marvin: {filter: 'invert', min: 0, max: 100, step: 1, units: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, step: 0.1, units: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, step: 0.1},
};

const picturesBlockElement = document.querySelector('.pictures');
const scaleSmallerButton = picturesBlockElement.querySelector('.scale__control--smaller');
const scaleBiggerButton = picturesBlockElement.querySelector('.scale__control--bigger');
const scaleControlInput = picturesBlockElement.querySelector('.scale__control--value');
const imgUploadPreviewElement = picturesBlockElement.querySelector('.img-upload__preview');
const imgPreviewElement = imgUploadPreviewElement.querySelector('img');
const effectsSelectFieldset = picturesBlockElement.querySelector('.img-upload__effects');
const effectLevelValueInput = picturesBlockElement.querySelector('.effect-level__value');
const effectLevelSliderElement = picturesBlockElement.querySelector('.effect-level__slider');

let currentImgEffect = 'none';

// Методы

const changeScaleValue = (newValue) => {
  scaleControlInput.setAttribute('value', `${newValue}%`);

  imgPreviewElement.style.transform = `scale(${newValue * 0.01})`;
};

const getScaleValue = () => parseInt(scaleControlInput.value, 10);

const incScaleValue = () => {
  changeScaleValue(clampNumber(getScaleValue() + SCALE_SIZE_STEP, SCALE_SIZE_MIN, SCALE_SIZE_MAX));
};

const decScaleValue = () => {
  changeScaleValue(clampNumber(getScaleValue() - SCALE_SIZE_STEP, SCALE_SIZE_MIN, SCALE_SIZE_MAX));
};

const showEffectSlider = () => {
  effectLevelSliderElement.classList.remove('hidden');
};

const hideEffectSlider = () => {
  effectLevelSliderElement.classList.add('hidden');
};

const resetImgEffectClass = () => {
  removeClassByPrefix(imgPreviewElement, EFFECT_CLASS_PREFIX);
};

const setEffectLevelValue = (value) => {
  effectLevelSliderElement.noUiSlider.set(value);
};

// События

scaleSmallerButton.addEventListener('click', decScaleValue);
scaleBiggerButton.addEventListener('click', incScaleValue);

effectsSelectFieldset.addEventListener('change', (evt) => {
  const effectName = evt.target.value;
  resetImgEffectClass();
  currentImgEffect = effectName;

  if (Object.keys(EffectFilters).includes(effectName)) {
    imgPreviewElement.classList.add(`${EFFECT_CLASS_PREFIX}${effectName}`);
    showEffectSlider();
    const {step, min, max} = EffectFilters[effectName];

    effectLevelSliderElement.noUiSlider.updateOptions(
      {step, range: {min, max}},
      true,
    );

    setEffectLevelValue(EffectFilters[effectName].min);

  } else {
    hideEffectSlider();
  }
});

noUiSlider.create(effectLevelSliderElement, {
  start: 0,
  step: 0.1,
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
});

effectLevelSliderElement.noUiSlider.on('update', (values, handle) => {
  const value = values[handle];
  effectLevelValueInput.value = value;

  let filterStyle = '';

  if (currentImgEffect !== 'none') {
    const {filter, units} = EffectFilters[currentImgEffect];
    filterStyle = `${filter}(${value}${units || ''})`;
  }

  imgPreviewElement.style.filter = filterStyle;
});

hideEffectSlider();

export {SCALE_SIZE_DEFAULT, DEFAULT_EFFECT_LEVEL_VALUE, changeScaleValue, resetImgEffectClass, setEffectLevelValue};
