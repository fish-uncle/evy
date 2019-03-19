const Mock = require('mockjs');
module.exports = Mock.mock({
  success: true,
  code: 200,
  data: {
    'list|10': [{
      user_id: '@guid',
      'employee_id': /Y\d{5}/,
      'sex|1-2': 1,
      'status|1-2': 1,
      'phone': /1\d{10}/,
      email: '@email',
      role: '@ctitle(4,7)',
      real_name: '@cname',
      job_name: '@ctitle(4,7)',
      birth_time: '@datetime',
      nation: '汉族',
      'marriage|1-3': 1,
      avatar: '@image(200x200,@color)',
      update_time: '@datetime',
      create_time: '@datetime'
    }],
    total: 10
  }
});