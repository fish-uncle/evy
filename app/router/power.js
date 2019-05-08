'use strict';


module.exports = app => {
  const {router, controller} = app;
  const checkLogin = app.middleware.checkLogin();
  const checkPower = app.middleware.checkPower();
  const power = controller.power.index;

  router.get(`/api/power/all`, checkLogin, power.all);
  router.post(`/api/power/select/auth`, checkLogin, power.selectAuth);
  router.post(`/api/power/select/menu`, checkLogin, power.selectMenu);
  router.post(`/api/power/update/menu`, checkLogin, checkPower, power.updateMenu);
  router.post(`/api/power/update/auth`, checkLogin, checkPower, power.updateAuth);

};