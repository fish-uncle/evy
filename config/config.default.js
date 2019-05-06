'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {};

  config.logger = {
    appLogName: `app.log`,
    coreLogName: `core.log`,
    agentLogName: `agent.log`,
    errorLogName: `error.log`,
  };

  config.keys = appInfo.name + '_1522136911587_199';

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
    renew: true,
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
  return config;
};


