'use strict';


module.exports = app => {
  const {router, controller} = app;

  const h5 = controller.h5.index;
  router.get(`/api/h5/recovery`, h5.recovery);
  router.get(`/api/h5/list`, h5.list);
  router.post(`/api/h5/insert`, h5.insert);
  router.post(`/api/h5/update`, h5.update);
  router.post(`/api/h5/delete`, h5.del);
  router.post(`/api/h5/recover`, h5.recover);

};