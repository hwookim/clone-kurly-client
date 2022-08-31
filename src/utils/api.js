import { BASE_URL } from '../config';

const HTTP_METHOD = {
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  DELETE() {
    return {
      method: 'DELETE',
    };
  },
};

const api = (() => {
  const config = {
    baseURL: BASE_URL,
  };

  const init = (conf) => {
    Object.assign(config, conf);
  };

  const getRequest = (url) => fetch(config.baseURL + url).then((response) => response.json());

  const postRequest = (url, data) =>
    fetch(config.baseURL + url, HTTP_METHOD.POST(data)).then((response) => response.json());

  const putRequest = (url, data) =>
    fetch(config.baseURL + url, HTTP_METHOD.PUT(data)).then((response) => response.json());

  const deleteRequest = (url) => fetch(config.baseURL + url, HTTP_METHOD.DELETE());

  return {
    init,
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest,
  };
})();

export default api;