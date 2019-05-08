'use strict';


module.exports = app => {
  const {router, controller} = app;
  const checkLogin = app.middleware.checkLogin();
  const checkPower = app.middleware.checkPower();
  const module = controller.module.index;

  router.get(`/api/module/recovery`, checkLogin, module.recovery);
  router.get(`/api/module/list`, checkLogin, module.list);
  router.post(`/api/module/insert`, checkLogin, checkPower, module.insert);
  router.post(`/api/module/update`, checkLogin, checkPower, module.update);
  router.post(`/api/module/delete`, checkLogin, checkPower, module.del);
  router.post(`/api/module/recover`, checkLogin, checkPower, module.recover);

};