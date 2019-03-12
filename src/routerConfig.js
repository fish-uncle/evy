import {
  IndexPage,
} from './routes/index.js';

/**
 * routerConfig的参数说明
 * @param path string 必须 路由
 * @param exact boolean 匹配规则
 * @param component object 必须 路由组件
 *
 * @param [title] string 该路由的title 默认为 小勤办卡
 * @param [backgroundColor] string 该路由的背景色， 默认为#fff
 * @param [needBackToLastView] boolean 是否记住该路由的滚动条位置  默认为 false
 * */
const routerConfig = [
  {
    path: '/',
    exact: true,
    component: IndexPage,
    title: 'DDM',
    backgroundColor: '#ffffff',
    needBackToLastView: true,
  }
];

export default routerConfig;
