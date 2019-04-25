'use strict';


module.exports = app => {
  const {router, controller} = app;
  const {login} = controller;
  router.post(`/api/login`, login.login);

};