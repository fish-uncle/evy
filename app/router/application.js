'use strict';


module.exports = app => {
  const {router, controller} = app;
  const checkLogin = app.middleware.checkLogin();
  const checkPower = app.middleware.checkPower();
  const application = controller.application.index;

  router.get(`/api/application/recovery`, checkLogin, application.recovery);
  router.get(`/api/application/list`, checkLogin, application.list);
  router.get(`/api/application/all`, checkLogin, checkPower, application.all);
  router.post(`/api/application/insert`, checkLogin, checkPower, application.insert);
  router.post(`/api/application/update`, checkLogin, checkPower, application.update);
  router.post(`/api/application/delete`, checkLogin, checkPower, application.del);
  router.post(`/api/application/recover`, checkLogin, checkPower, application.recover);

};