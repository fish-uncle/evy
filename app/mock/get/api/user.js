const Mock = require('mockjs');
module.exports = Mock.mock({
  success: true,
  code: 200,
  data: {
    'list|10': [{
      user_id: '@guid',
      'employee_id': /Y\d{5}/,
      'sex|1-2': 1,
      'pay|3000-5000': 1,
      'phone': /1\d{10}/,
      email: '@email',
      'role|1-2': 1,
      remark: '@ctitle(10,20)',
      bank_address: '@ctitle(10,20)',
      native_address: '@ctitle(10,20)',
      bank_card: /\d{19}/,
      real_name: '@cname',
      birth_time: '@datetime',
      join_time: '@datetime',
      nation: '汉族',
      'marriage|1-3': 1,
      avatar: '@image(200x200,@color)',
      update_time: '@datetime',
      create_time: '@datetime'
    }],
    total: 10
  }
});