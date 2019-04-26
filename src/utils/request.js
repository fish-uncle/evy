import fetch from 'dva/fetch';
import LoadingInAjax from '../components/EVY_LoadingInAjax';
import {notification} from "antd";

function parseJSON(response) {
  return response ? response.json() : {};
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  notification.error({message: '提示', description: error.toString()});
  return null
}

function checkResult(res) {
  const {success, data, msg} = res;
  if (success) {
    return data;
  }
  notification.error({message: '提示', description: msg});
  return null
}

let requestCount = 0;
let timeoutForLoadingToShow;

function requestStart() {
  requestCount++;
  clearTimeout(timeoutForLoadingToShow);
  timeoutForLoadingToShow = setTimeout(_ => {
    LoadingInAjax.show();
  }, 50);
}

function parseParams(obj) {
  if (!obj) return '';

  let resArr = [];
  Object.keys(obj).map(value => {
    let str = value + '=' + encodeURIComponent(obj[value]);
    resArr.push(str);
  });
  return resArr.join('&');
}

function requestEnd() {
  requestCount--;
  // console.log('requestCount = ' + requestCount);
  if (requestCount < 1) {
    clearTimeout(timeoutForLoadingToShow);
    LoadingInAjax.hide();
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  // 设置默认选项
  let defaultOpt = {
    method: 'GET',
    credentials: 'include', // same-origin（同源）， include（跨源）， omit（不包含cookie）
  };
  if (!(options.body instanceof FormData)) {
    defaultOpt.headers = new Headers({
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    });
  }
  const newOpt = {...defaultOpt, ...options};
  const {body} = newOpt;

  // 去除多余属性
  if (typeof body === 'object') {
    Object.keys(body)
      .forEach(key => {
        if (!body[key] && body[key] !== 0) {
          delete body[key];
        }
      });
  }

  const {method} = newOpt;
  if (method === 'GET' || method === 'HEAD') {
    Object.keys(body).forEach(key => {
      if (url.indexOf('?') === -1) {
        url += '?' + key + '=' + body[key];
      } else {
        url += '&' + key + '=' + body[key];
      }
    });
    delete newOpt.body;
  }

  if (newOpt.body && typeof newOpt.body === 'object') {
    if (newOpt.body instanceof FormData) {
    } else {
      newOpt.body = JSON.stringify(newOpt.body);
      // newOpt.body = parseParams(newOpt.body);
    }
  }

  requestStart();
  return fetch(url, newOpt)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkResult)
    .then(res => {
      requestEnd();
      return res;
    }, e => {
      requestEnd();
      throw e;
    });

}

/**
 * 以get方式请求
 * @param {string} url 请求的地址，如：/banner/{id}
 * @param {object} body  请求的参数，如：{id:123}
 * */
function GET(url, body = {}) {
  const method = 'GET';
  return request(url, {method, body});
}

/**
 * 以POST方式请求
 * @param {string} url 请求的地址，如：/banner/{id}
 * @param {object} body  请求的参数，如：{id:123}
 * */
function POST(url, body = {}) {
  const method = 'POST';
  return request(url, {method, body});
}

/**
 * 以DELETE方式请求
 * @param {string} url 请求的地址，如：/banner/{id}
 * @param {object} body  请求的参数，如：{id:123}
 * */
function DELETE(url, body = {}) {
  const method = 'DELETE';
  return request(url, {method, body});
}

/**
 * 以PUT方式请求
 * @param {string} url 请求的地址，如：/banner/{id}
 * @param {object} body  请求的参数，如：{id:123}
 * */
function PUT(url, body = {}) {
  const method = 'PUT';
  return request(url, {method, body});
}

/**
 * 以OPTIONS方式请求
 * @param {string} url 请求的地址，如：/banner/{id}
 * @param {object} body  请求的参数，如：{id:123}
 * */
function OPTIONS(url, body = {}) {
  const method = 'OPTIONS';
  return request(url, {method, body});
}

/**
 * 以PATCH方式请求
 * @param {string} url 请求的地址，如：/banner/{id}
 * @param {object} body  请求的参数，如：{id:123}
 * */
function PATCH(url, body = {}) {
  const method = 'PATCH';
  return request(url, {method, body});
}

/**
 * 以HEAD方式请求
 * @param {string} url 请求的地址，如：/banner/{id}
 * @param {object} body  请求的参数，如：{id:123}
 * */
function HEAD(url, body = {}) {
  const method = 'HEAD';
  return request(url, {method, body});
}

export {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH};
