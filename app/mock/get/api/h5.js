const Mock = require('mockjs');
module.exports = Mock.mock({
  success: true,
  code: 200,
  data: {
    'list|10': [{
      h5_id: '@guid',
      title: '@cname',
      name: '@cname',
      release: '@boolean',
      env: 'test',
      js_url: ['yy.js', 'xx.js'],
      version: /1\.\d\.\d/,
      css_url: ['xx.css', 'ss.css'],
      update_time: '@datetime',
      create_time: '@datetime',
    }],
    total: 10
  }
});