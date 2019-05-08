'use strict';


module.exports = app => {
  const {router, controller} = app;
  const checkLogin = app.middleware.checkLogin();
  const checkPower = app.middleware.checkPower();
  const auth = controller.auth.index;

  router.get(`/api/auth/all`, checkLogin, checkPower, auth.all);
  router.get(`/api/auth/recovery`, checkLogin, auth.recovery);
  router.get(`/api/auth/list`, checkLogin, auth.list);
  router.post(`/api/auth/insert`, checkLogin, checkPower, auth.insert);
  router.post(`/api/auth/update`, checkLogin, checkPower, auth.update);
  router.post(`/api/auth/delete`, checkLogin, checkPower, auth.del);
  router.post(`/api/auth/recover`, checkLogin, checkPower, auth.recover);

};