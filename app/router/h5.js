'use strict';


module.exports = app => {
  const {router, controller} = app;
  const checkLogin = app.middleware.checkLogin();
  const checkPower = app.middleware.checkPower();
  const h5 = controller.h5.index;

  router.get(`/api/h5/recovery`, checkLogin, h5.recovery);
  router.get(`/api/h5/list`, checkLogin, h5.list);
  router.post(`/api/h5/insert`, checkLogin, checkPower, h5.insert);
  router.post(`/api/h5/update`, checkLogin, checkPower, h5.update);
  router.post(`/api/h5/delete`, checkLogin, checkPower, h5.del);
  router.post(`/api/h5/recover`, checkLogin, checkPower, h5.recover);

};