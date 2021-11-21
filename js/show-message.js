let messageElement = null;

let messageButton = null;

const closeMessage = () => {
  messageElement.removeEventListener('click', messageOutsideClickHandler);
  messageButton.removeEventListener('click', buttonClickHandler);
  document.removeEventListener('keydown', keydownHandler);

  messageElement.remove();
  messageElement = null;
  messageButton = null;
};

function buttonClickHandler () {
  closeMessage();
}

const showMessage = (template) => {
  messageElement = template.cloneNode(true);

  const messageClass = messageElement.className;
  messageButton = messageElement.querySelector(`.${messageClass}__button`);

  messageElement.addEventListener('click', messageOutsideClickHandler);
  messageButton.addEventListener('click', buttonClickHandler);

  document.addEventListener('keydown', keydownHandler);

  document.body.appendChild(messageElement);
};

function messageOutsideClickHandler (evt) {
  if (this === evt.target) {
    closeMessage();
  }
}

function keydownHandler (evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.stopPropagation();
    closeMessage();
  }
}

export {showMessage};
