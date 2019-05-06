'use strict';


module.exports = app => {
  const {router, controller} = app;

  const menu = controller.menu.index;
  router.get(`/api/menu/all`, menu.all);
  router.get(`/api/menu/auth`, menu.auth);
  router.get(`/api/menu/recovery`, menu.recovery);
  router.get(`/api/menu/list`, menu.list);
  router.post(`/api/menu/insert`, menu.insert);
  router.post(`/api/menu/update`, menu.update);
  router.post(`/api/menu/delete`, menu.del);
  router.post(`/api/menu/recover`, menu.recover);

};