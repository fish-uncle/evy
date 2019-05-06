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

exports.gzip = {
  enable: true,
  path: path.join(__dirname, '../lib/egg-gzip')
};

exports.access = {
  enable: true,
  path: path.join(__dirname, '../lib/egg-access')
};

exports.mockjs = {
  enable: true,
  path: path.join(__dirname, '../lib/egg-mockjs')
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
};

exports.sql = {
  enable: true,
  path: path.join(__dirname, '../lib/egg-sql')
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};