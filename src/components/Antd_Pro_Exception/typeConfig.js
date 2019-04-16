const img_403 = require('../../imgs/403.svg');
const img_404 = require('../../imgs/404.svg');
const img_500 = require('../../imgs/500.svg');
const config = {
  403: {
    img: img_403,
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: img_404,
    title: '404',
    desc: '抱歉，你访问的页面不存在',
  },
  500: {
    img: img_500,
    title: '500',
    desc: '抱歉，服务器出错了',
  },
};

export default config;
