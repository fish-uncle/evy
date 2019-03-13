import {
  IndexPage,
  UserPage
} from './routes';

/**
 * routerConfig的参数说明
 * @param path string 必须 路由
 * @param exact boolean 匹配规则  默认为 true
 * @param component object 必须 路由组件
 *
 * @param [title] string 该路由的title 默认为 Dynamic Data Management
 * */
const routerConfig = [
  {
    path: '/',
    title: '11',
    component: IndexPage,
  },
  {
    path: '/user',
    title: 'user',
    component: UserPage,
  }
];

export default routerConfig;
