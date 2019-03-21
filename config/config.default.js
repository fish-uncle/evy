'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1522136911587_199';

  // config.middleware = ['auth', 'operationRecord'];

  config.security = {
    csrf: false,
  };

  config.cluster = {
    listen: {
      path: '',
      port: 6602,
      hostname: '127.0.0.1',
    }
  };

  config.session = {
    renew: true,  // 延长 Session 的有效期
  };

  config.static = {
    prefix: '/'
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    root: path.join(appInfo.baseDir, 'app/view')
  };

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '',
      database: 'evy',
    },
    app: true,
    agent: false,
  };

  // config.forward = {
  //   proxy: [{
  //     target: '127.0.0.1:1314',
  //     from: '/menu/list'
  //   }]
  // };

  // config.auth = {
  // ignore: [
  //   `/${name}/login`,
  //   `/${name}/logout`,
  //   `/login`,
  //   `/forgetPassword`
  // ]
  // };

  return config;
};

