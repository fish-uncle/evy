'use strict';


module.exports = app => {
  const {router, controller} = app;
  const checkLogin = app.middleware.checkLogin();
  const checkPower = app.middleware.checkPower();
  const user = controller.user.index;

  router.get(`/api/user/list`, checkLogin, user.list);
  router.get(`/api/user/recovery`, checkLogin, user.recovery);
  router.post(`/api/user/insert`, checkLogin, checkPower, user.insert);
  router.post(`/api/user/update`, checkLogin, checkPower, user.update);
  router.post(`/api/user/delete`, checkLogin, checkPower, user.del);
  router.post(`/api/user/recover`, checkLogin, checkPower, user.recover);
  router.post(`/api/user/password`, checkLogin, checkPower, user.password);

};