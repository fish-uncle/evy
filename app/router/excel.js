'use strict';


module.exports = app => {
  const {router, controller} = app;
  const {excel} = controller;
  router.get(`/api/export/app`, excel.user);
  router.get(`/api/excel/user`, excel.user);

};