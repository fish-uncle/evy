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
整个项目主要是由[egg](https://eggjs.org/zh-cn/)+[dva](https://dvajs.com/guide/)+[antd](https://ant.design/index-cn)+[roadhog](https://www.npmjs.com/package/roadhog) 搭建完成的

框架基础文档这里就不说了

## coding
* [√] todo 基础框架搭建
* [√] todo 员工列表
* [√] todo 仪表盘
* [√] todo 左侧菜单列表
* [] todo 表格搜索
* [] todo 回收站
* [] todo 登录
* [] todo 授权管理
