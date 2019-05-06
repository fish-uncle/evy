'use strict';


module.exports = app => {
  const {router, controller} = app;

  const module = controller.module.index;
  router.get(`/api/module/recovery`, module.recovery);
  router.get(`/api/module/list`, module.list);
  router.post(`/api/module/insert`, module.insert);
  router.post(`/api/module/update`, module.update);
  router.post(`/api/module/delete`, module.del);
  router.post(`/api/module/recover`, module.recover);

};