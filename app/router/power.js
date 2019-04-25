'use strict';


module.exports = app => {
  const {router, controller} = app;

  const {power} = controller;
  router.post(`/api/power/all`, power.all);
  router.post(`/api/power/select`, power.select);
  router.post(`/api/power/update`, power.update);

};