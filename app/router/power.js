'use strict';


module.exports = app => {
  const {router, controller} = app;

  const {power} = controller;
  router.get(`/api/power/all`, power.all);
  router.post(`/api/power/select/auth`, power.selectAuth);
  router.post(`/api/power/select/menu`, power.selectMenu);
  router.post(`/api/power/update/menu`, power.updateMenu);
  router.post(`/api/power/update/auth`, power.updateAuth);

};