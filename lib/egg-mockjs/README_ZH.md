![youe](http://git.oschina.net/uploads/images/2017/0105/093007_43b71efd_439881.png "youe")

![version](https://img.shields.io/badge/version-v1.0.0-brightgreen.svg?style=flat-square) [![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

[中文](https://gitee.com/shenzhepei/egg-visit/blob/master/README_ZH.md) • [English](https://gitee.com/shenzhepei/egg-visit/blob/master/README.md)

## 快速开始

install

```
npm install git+https://gitee.com/shenzhepei/egg-mockjs.git --save
npm install mockjs --save-dev

```

## API

* mockjs

依赖mockjs，详见[mockjs文档](https://github.com/nuysoft/Mock/wiki)

```
mockjs: {
  dir: path.join(appInfo.root, 'app', 'mock'),
  apiUrl: ''
}
```

```
exports.mockjs = {
  enable: true,
  package: 'egg-mockjs'
};
```

## 怎么使用

```
├── app                      // egg app根目录
│   └── mock                 // mock 文件
|       ├── get              // 请求类型
|       |   └── test.js      // mock数据
│       ├── post
│       ├── delete
│       └── put

```

```
\test.js
'use strict';
const Mock = require('mockjs');

module.exports = Mock.mock({
    'success': true,
    'code': 200,
    'total': 20,
    'data|10': [
        {
            id: '@id',
            name: '@cname',
            phone: /^1[34578]\d{9}$/,
            role: '@ctitle',
            state: '@boolean',
            email: '@email',
            isMale: '@boolean',
            createTime: '@datetime',
            update_time: '@datetime',
        },
    ]
});

```
你可以请求/test获得mock的数据

## 许可证

[MIT](LICENSE)
