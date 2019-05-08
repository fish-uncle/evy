'use strict';


module.exports = app => {
  const {router, controller} = app;
  const checkLogin = app.middleware.checkLogin();
  const checkPower = app.middleware.checkPower();
  const role = controller.role.index;

  router.get(`/api/role/all`, checkLogin, role.all);
  router.get(`/api/role/recovery`, checkLogin, role.recovery);
  router.get(`/api/role/list`, checkLogin, role.list);
  router.post(`/api/role/insert`, checkLogin, checkPower, role.insert);
  router.post(`/api/role/update`, checkLogin, checkPower, role.update);
  router.post(`/api/role/delete`, checkLogin, checkPower, role.del);
  router.post(`/api/role/recover`, checkLogin, checkPower, role.recover);

};