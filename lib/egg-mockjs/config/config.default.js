'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {
    mockjs: {
      dir: path.join(appInfo.root, 'app', 'mock'),
      apiUrl: ''
    }
  };
  return config;
};

