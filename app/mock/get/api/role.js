const Mock = require('mockjs');
module.exports = Mock.mock({
  success: true,
  code: 200,
  data: {
    'list|10': [{
      role_id: '@guid',
      title: '@cname',
      'count|10-30': 1,
      update_time: '@datetime',
      create_time: '@datetime'
    }],
    total: 10
  }
});