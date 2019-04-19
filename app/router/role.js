'use strict';


module.exports = app => {
  const {router, controller} = app;

  const {role} = controller;
  router.get(`/api/role/all`, role.all);
  router.get(`/api/role/recovery`, role.recovery);
  router.get(`/api/role/list`, role.list);
  router.post(`/api/role/insert`, role.insert);
  router.post(`/api/role/update`, role.update);
  router.post(`/api/role/delete`, role.del);
  router.post(`/api/role/recover`, role.recover);

};