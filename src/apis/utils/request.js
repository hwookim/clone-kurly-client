import { BASE_URL } from '../../config';
import HTTP_METHOD from './method';

const request = (() => {
  const config = {
    baseURL: BASE_URL,
  };
  const isTest = BASE_URL === 'http://localhost:3000/data';

  const convertURL = (url) => {
    if (!isTest) {
      return config.baseURL + url;
    }
    if (url.includes('?')) {
      return config.baseURL + url.substring(0, url.indexOf('?')) + '.json';
    }
    return config.baseURL + url + '.json';
  };

  const getRequest = (url) => fetch(convertURL(url), HTTP_METHOD.GET()).then((response) => response.json());

  const postRequest = (url, data) =>
    fetch(config.baseURL + url, HTTP_METHOD.POST(data)).then((response) => response.json());

  const putRequest = (url, data) =>
    fetch(config.baseURL + url, HTTP_METHOD.PUT(data)).then((response) => response.json());

  const deleteRequest = (url) => fetch(config.baseURL + url, HTTP_METHOD.DELETE());

  return {
    get: getRequest,
    post: postRequest,
    put: putRequest,
    delete: deleteRequest,
  };
})();

export default request;
