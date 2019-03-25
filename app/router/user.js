'use strict';


module.exports = app => {
  const {router, controller} = app;

  const {user} = controller;
  router.get(`/api/user/list`, user.list);
  router.get(`/api/user/recovery`, user.recovery);
  router.post(`/api/user/insert`, user.insert);
  router.post(`/api/user/update`, user.update);
  router.post(`/api/user/delete`, user.del);
  router.post(`/api/user/recover`, user.recover);

};