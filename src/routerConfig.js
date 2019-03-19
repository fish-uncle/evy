import {
  IndexPage,
  UserPage,
  AppPage,
  RolePage
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
    title: '',
    component: IndexPage,
  },
  {
    path: '/user',
    title: '用户中心',
    component: UserPage,
  },
  {
    path: '/role',
    title: '角色管理',
    component: RolePage,
  },
  {
    path: '/app',
    title: '应用列表',
    component: AppPage,
  }
];

export default routerConfig;
