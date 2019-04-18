![Evy](src/imgs/logo-gray.png)
# evy

![version](https://img.shields.io/badge/version-v1.0.0-brightgreen.svg?style=flat-square) [![React](https://img.shields.io/badge/react-16.x.x-brightgreen.svg?style=flat-square)](https://github.com/facebook/react) [![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)


## 名字由来
Evy(伊菲) 洛奇英雄传
> 传闻来自东方贵族家庭的魔法师，不仅能使用“法杖”放魔法箭、炎爆术，还会使用炼金术召唤元素傀儡。在钻研魔法技巧后，更可使用能使用让物体失去重力的古代魔法。而一旦切换“战镰”作为武器后就化身近战法师，英勇对敌。

![Evy](src/imgs/evy.jpg)

## 部署
开发环境
```
git clone https://github.com/fish-uncle/evy.git
cd evy && npm install
npm run dev // roadhog 服务
npm run server // egg服务
```
see at http://127.0.0.1:6601

生产环境
```
npm run build // roadhog 打包
npm run start // egg服务
```
see at http://127.0.0.1:6602

`记得运行初始化sql` /database/
## 文档
整个项目主要是由[egg](https://eggjs.org/zh-cn/)+[dva](https://dvajs.com/guide/)+[antd](https://ant.design/index-cn)+[roadhog](https://www.npmjs.com/package/roadhog)+[mysql](https://www.mysql.com/) 搭建完成的

框架基础文档这里就不说了

### 定制主题色
.webpackrc.js
```javascript
theme: {
  "primary-color": "#1DA57A",
}
```

### 修改 logo 、系统名、备案号
src/models/config.js
```javascript
state: {
  title: 'EVY',
  logo: {white: require('../imgs/logo-white.png'), gray: require('../imgs/logo-gray.png')},
  icp: '浙ICP备17040239号',
  copyRight: `Copyright © ${new Date().getFullYear()} EVY `
}
```
### mysql 数据库初始化
```
database/evy.sql // 建表

database/init.sql // 数据初始化
```

### 使用 mock 数据
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
## [更新日志](./CHANGELOG.md)

## coding
* [√] 基础框架搭建
* [√] 员工列表
* [√] 仪表盘
* [√] 左侧菜单列表
* [√] 详情组件添加拾色器
* [√] 添加搜索导出三个按钮优化配置方式
* [√] 回收站
* [√] 登录
* [√] 404 403 500
* [] todo 搜索
* [] todo 
* [] todo 授权管理
