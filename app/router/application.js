'use strict';


module.exports = app => {
  const {router, controller} = app;

  const {application} = controller;
  router.get(`/api/application/recovery`, application.recovery);
  router.get(`/api/application/list`, application.list);
  router.get(`/api/application/all`, application.all);
  router.post(`/api/application/insert`, application.insert);
  router.post(`/api/application/update`, application.update);
  router.post(`/api/application/delete`, application.del);
  router.post(`/api/application/recover`, application.recover);

};