const Mock = require('mockjs');
module.exports = Mock.mock({
  success: true,
  code: 200,
  data: {
    'list|10': [{
      app_id: '@guid',
      associate_url: '@url',
      icon: '@image(200x200,@color)',
      cn_title: '@cname',
      en_title: '@name',
      description: '@ctitle(10,20)',
      version: /1\.\d\.\d/,
      update: '@boolean',
      update_time: '@datetime',
      create_time: '@datetime'
    }],
    total: 10
  }
});