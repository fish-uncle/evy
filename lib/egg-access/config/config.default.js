'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {
    customLogger: {
      accessLogger: {
        file: path.join(appInfo.root, 'logs', appInfo.name, 'access.log'),
      },
    },
    access: {
      enabled: true,
      ignore: []
    },
  };
  return config;
};

