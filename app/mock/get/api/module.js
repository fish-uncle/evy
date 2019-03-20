const Mock = require('mockjs');
module.exports = Mock.mock({
  success: true,
  code: 200,
  data: {
    'list|10': [{
      app_id: '@guid',
      cn_title: '@cname',
      en_title: '@name',
      release: '@boolean',
      description: '@ctitle(10,20)',
      'label|1-2': 1,
      content: '<p>我是<em>撒的骄</em>傲是<span style="color: rgb(0,168,133);">滴哦静安寺</span>撒旦撒旦<strong>撒是啊阿</strong>斯顿</p>\n' +
        '<p></p>\n' +
        '<p style="text-align:center;">撒旦撒旦撒旦阿斯顿</p>',
      start_time: '@datetime',
      end_time: '@datetime',
      timing: '@boolean',
      update_time: '@datetime',
      create_time: '@datetime',
    }],
    total: 10
  }
});