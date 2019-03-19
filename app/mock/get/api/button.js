const Mock = require('mockjs');
module.exports = Mock.mock({
  success: true,
  code: 200,
  data: {
    'list': [{
      button_id: '@guid',
      title: '添加',
      type: 'insert',
      style: 1,
      icon: '',
      update_time: '@datetime',
      create_time: '@datetime'
    }],
    total: 10
  }
});