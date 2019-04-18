'use strict';


module.exports = app => {

  const menu = require('./router/menu');
  const excel = require('./router/excel');
  const user = require('./router/user');
  const application = require('./router/application');
  menu(app);
  excel(app);
  user(app);
  application(app);

};