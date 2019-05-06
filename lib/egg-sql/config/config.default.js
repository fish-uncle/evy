'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {};

  config.customLogger = {
    sqlLogger: {
      file: path.join(appInfo.root, 'logs', appInfo.name, 'sql.log'),
    }
  };

  return config;
};


