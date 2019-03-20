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
      menu_id: '4',
      nexus: null,
      title: "应用列表",
      icon: 'shop',
      type: 1,
      url: "/app"
    }, {
      menu_id: '2',
      nexus: null,
      title: "设置",
      type: 1,
      icon: 'setting',
      url: ""
    }, {
      menu_id: '3',
      nexus: '2',
      title: "用户中心",
      type: 1,
      icon: 'user',
      url: "/user"
    }, {
      menu_id: '6',
      nexus: '2',
      title: "角色管理",
      icon: 'team',
      type: 1,
      url: "/role"
    }, {
      menu_id: '5',
      nexus: "",
      title: "关于开发者",
      icon: 'github',
      type: 2,
      url: "https://github.com/fish-uncle"
    }]
  }
});