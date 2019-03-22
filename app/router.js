'use strict';


module.exports = app => {

  const menu = require('./router/menu');
  const excel = require('./router/excel');
  const user = require('./router/user');
  menu(app);
  excel(app);
  user(app);

};