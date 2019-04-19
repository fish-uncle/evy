app/mock
根据目录结构生成

例: 目录为 app/mock/get/api/example.js 

生成的路由为 [GET] /api/example

附 mockjs 简单例子
```javascript
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
```