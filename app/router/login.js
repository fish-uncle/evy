'use strict';


module.exports = app => {
  const {router, controller} = app;
  const login = controller.login.index;

  router.post(`/api/login`, login.login);
  router.post(`/api/logout`, login.logout);

};