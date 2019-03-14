const Mock = require('mockjs');
module.exports = Mock.mock({
  'success': true,
  'code': 200,
  'data': {
    'list|10': [{
      user_id: '@guid',
      'employee_id': /Y\d{5}/,
      'sex|0-2': 1,
      'status|0-1': 1,
      'phone': /1\d{10}/,
      email: '@email',
      real_name: '@cname',
      job_name: '@ctitle(4,7)',
      birth_time: '@datetime',
      nation: '汉族',
      'marriage|0-2': 1,
      avatar: '@image(200x200,@color)',
      update_time: '@datetime',
      create_time: '@datetime'
    }],
    total: 10
  }
});