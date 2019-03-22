const Mock = require('mockjs');
module.exports = Mock.mock({
  success: true,
  code: 200,
  data: {
    'list': [{
      menu_id: '1',
      nexus: null,
      title: "仪表盘",
      type: 1,
      icon: 'dashboard',
      url: "/"
    }, {
      menu_id: '3',
      nexus: '',
      title: "员工列表",
      type: 1,
      icon: 'user',
      url: "/user"
    }]
  }
});