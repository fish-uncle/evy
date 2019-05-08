'use strict';


module.exports = app => {
  const {router, controller} = app;
  const checkLogin = app.middleware.checkLogin();
  const checkPower = app.middleware.checkPower();
  const menu = controller.menu.index;

  router.get(`/api/menu/all`, checkLogin, menu.all);
  router.get(`/api/menu/auth`, checkLogin, menu.auth);
  router.get(`/api/menu/recovery`, checkLogin, menu.recovery);
  router.get(`/api/menu/list`, checkLogin, menu.list);
  router.post(`/api/menu/insert`, checkLogin, checkPower, menu.insert);
  router.post(`/api/menu/update`, checkLogin, checkPower, menu.update);
  router.post(`/api/menu/delete`, checkLogin, checkPower, menu.del);
  router.post(`/api/menu/recover`, checkLogin, checkPower, menu.recover);

};