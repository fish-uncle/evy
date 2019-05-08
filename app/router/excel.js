'use strict';


module.exports = app => {
  const {router, controller} = app;
  const checkLogin = app.middleware.checkLogin();
  const checkPower = app.middleware.checkPower();
  const {excel} = controller;

  router.get(`/api/export/app`, checkLogin, checkPower, excel.user);
  router.get(`/api/excel/user`, checkLogin, checkPower, excel.user);

};