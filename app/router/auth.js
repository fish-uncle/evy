'use strict';


module.exports = app => {
  const {router, controller} = app;

  const {auth} = controller;
  router.get(`/api/auth/all`, auth.all);
  router.get(`/api/auth/recovery`, auth.recovery);
  router.get(`/api/auth/list`, auth.list);
  router.post(`/api/auth/insert`, auth.insert);
  router.post(`/api/auth/update`, auth.update);
  router.post(`/api/auth/delete`, auth.del);
  router.post(`/api/auth/recover`, auth.recover);

};