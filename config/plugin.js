'use strict';
const path = require('path');
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

exports.mockjs = {
  enable: true,
  path: path.join(__dirname, '../lib/egg-mockjs')
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
};