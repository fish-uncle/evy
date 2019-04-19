const Mock = require('mockjs');
module.exports = Mock.mock({
  success: true,
  code: 200,
  data: {
    'list|10': [{
      id: '@guid',
      field1: '@cname',
      field2: '@cname',
      field3: '@ctitle',
      field4: '@ctitle',
      field_img: '@image(200x200,@color)',
      field_text: '@title',
      field_select: '汉族',
      field_cascader: '浙江省,杭州市,下城区',
      field_multiple: ['精品', '置顶'],
      field_date: '@datetime',
      field_rangeDate: ['@datetime', '@datetime'],
      field_editor: '<p>富文本是一个很好的东西</p>\n' +
        '<p></p>\n' +
        '<p style="text-align:center;">好好学习，天天向上</p>',
      field_color: '@color',
      field_content: '@title',
      field_switch: '@boolean',
      update_time: '@datetime',
      create_time: '@datetime',
    }],
    total: 10
  }
});