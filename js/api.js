const ERROR_DISPLAY_TIMEOUT = 5000;

const fetchErrorHandler = (reason) => {
  const alertElement = document.createElement('div');
  alertElement.textContent = reason;
  alertElement.style.cssText = `
    background: red;
    color: white;
    padding: 10px;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
  `;

  document.body.append(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ERROR_DISPLAY_TIMEOUT);
};

const getPosts = () => fetch('https://24.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      fetchErrorHandler(response.statusText);
    }
    return response.json();
  })
  .catch(() => {
    fetchErrorHandler('Произошла ошибка');
  });

const sendPost = (action, method, body) => fetch(action, {method, body})
  .catch((reason) => {
    fetchErrorHandler(reason);
  });

export {getPosts, sendPost};
