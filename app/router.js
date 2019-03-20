'use strict';


module.exports = app => {
  const {router, controller} = app;

  router.get(`/api/export/app`, controller.export.application);

};