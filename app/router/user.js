'use strict';


module.exports = app => {
  const {router, controller} = app;

  const {user} = controller;
  router.get(`/api/user/list`, user.list);
  router.post(`/api/user/insert`, user.insert);
  router.post(`/api/user/update`, user.update);

};