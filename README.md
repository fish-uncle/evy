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
npm run server // egg 服务
```
see at http://127.0.0.1:6601

生产环境
```
npm run build // roadhog 打包
npm run start // egg 服务
```
see at http://127.0.0.1:6602

`记得运行初始化sql` /database/

测试账号 test@163.com 888888

管理员账号 admin@163.com 888888

## 文档
整个项目主要是由[egg](https://eggjs.org/zh-cn/)+[dva](https://dvajs.com/guide/)+[antd](https://ant.design/index-cn)+[roadhog](https://www.npmjs.com/package/roadhog)+[mysql](https://www.mysql.com/) 搭建完成的

### [基础](./doc/基础.md)

### [定制主题色](./doc/定制主题色.md)

### [修改logo、系统名、备案号](./doc/修改logo、系统名、备案号.md)

### [mysql数据库初始化](./doc/mysql数据库初始化.md)

### [使用mock数据](./doc/使用mock数据.md)

### 表单

#### [增删改查](./doc/表单/增删改查.md)

#### 组件
* [input 输入框](./doc/表单/组件/input.md)
* [textarea 输入框](./doc/表单/组件/textarea.md) 
* [select 选择框](./doc/表单/组件/select.md)
* [multiple 多选框](./doc/表单/组件/multiple.md)
* [color 拾色器](./doc/表单/组件/color.md)
* [switch 开关](./doc/表单/组件/switch.md)
* [date 日期选择框](./doc/表单/组件/date.md)
* [rangedate 范围日期选择框](./doc/表单/组件/rangedate.md)
* [file 文件上传](./doc/表单/组件/file.md)
* [img 图片上传](./doc/表单/组件/img.md)
* [cascader 多级联动选择框](./doc/表单/组件/cascader.md)
* [editor 富文本编辑器](./doc/表单/组件/editor.md)
* [hidden 不显示的](./doc/表单/组件/hidden.md)

#### [其他](./doc/表单/其他.md)

## [更新日志](./CHANGELOG.md)

## coding
* [] todo 导出
* [] todo 表单参数后端校验