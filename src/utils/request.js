import {notification} from "antd";

const axios = require('axios');
const format = require('date-fns/format');
const {BrowserClient, Hub} = require('@sentry/browser');
// https://sentry.io 申请 dsn
const client = new BrowserClient({
  dsn: 'https://fb2dedd217ca40a4b8f540abc45ff49c@sentry.io/1478316',
  release: `${process.env.NODE_ENV}${pkg.version}`,
  environment: `${process.env.NODE_ENV === 'production' ? 'production' : 'test'}`
});
const hub = new Hub(client);

let requestKeyInfo;

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '/' : '/';

axios.interceptors.request.use(function (config) {
  requestKeyInfo = {
    headers: config.headers,
    method: config.method,
    url: config.url,
    data: config.data,
  };
  return config;
}, function (error) {
  return Promise.reject(error);
});


// {
//   code: 200
//   data: '数据',
//   success: true,
//   msg： null
// }
// 可自行判断 逻辑报错请求
axios.interceptors.response.use(response => {
  const {data} = response;
  if (data.data === 0 || data.data === 1) {
    return data.data;
  }
  if (!data.success) {
    console.error(data.msg || '网络异常，请重试');
    notification.error({message: '提示', description: data.msg || '网络异常，请重试'});
    hub.configureScope(scope => {
      scope.setUser({
        username: 'fishuncle',
        email: 'fish-uncle@126.com'
      });
      scope.setLevel('error');
      scope.setTag('env', process.env.NODE_ENV);
      scope.setTag('url', requestKeyInfo.url);
      scope.setExtra("Request", {
        method: requestKeyInfo.method,
        url: requestKeyInfo.url,
        headers: requestKeyInfo.headers,
        data: requestKeyInfo.data,
      });
      scope.setExtra("Response", response);
    });
    hub.captureMessage(`${format(new Date(), 'YYYY-MM-DD HH:mm:ss')} [error] Request Error: ${requestKeyInfo.url}`);
    return false;
  }
  if (data.data === void 0) {
    return data.success;
  }
  return data.data;

}, function (e) {
  // 上报后端无响应的错误请求
  hub.configureScope(scope => {
    scope.setUser({
      username: 'fishuncle',
      email: 'fish-uncle@126.com'
    });
    scope.setLevel('error');
    scope.setTag('env', process.env.NODE_ENV);
    scope.setTag('url', requestKeyInfo.url);
    scope.setExtra("Request", {
      method: requestKeyInfo.method,
      url: requestKeyInfo.url,
      headers: requestKeyInfo.headers,
      data: requestKeyInfo.data,
    });
    scope.setExtra("Error", e);
  });
  hub.captureMessage(`${format(new Date(), 'YYYY-MM-DD HH:mm:ss')} [error] Request Fatal: ${requestKeyInfo.url}`);
  return false;
});

export default axios;