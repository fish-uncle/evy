'use strict';


module.exports = app => {
  const {router, controller} = app;

  const {menu} = controller;
  router.get(`/api/menu/auth`, menu.auth);
  router.get(`/api/menu/list`, menu.list);

};