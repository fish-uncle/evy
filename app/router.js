'use strict';


module.exports = app => {

  const menu = require('./router/menu');
  const excel = require('./router/excel');
  const user = require('./router/user');
  const application = require('./router/application');
  const module = require('./router/module');
  const role = require('./router/role');
  const auth = require('./router/auth');
  menu(app);
  excel(app);
  user(app);
  application(app);
  module(app);
  role(app);
  auth(app);

};