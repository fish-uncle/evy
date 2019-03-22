import {
  IndexPage,
  UserPage,
  AppPage,
  AppRecovery,
  ModulePage,
  RolePage,
  // NewsPage
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
    component: IndexPage,
  },
  {
    path: '/user',
    component: UserPage,
  },
  {
    path: '/role',
    component: RolePage,
  },
  {
    path: '/app',
    component: AppPage,
  },
  {
    path: '/app/recovery',
    component: AppRecovery,
  },
  {
    path: '/module/:app_id',
    component: ModulePage,
  },
  // {
  //   path: '/news',
  //   component: NewsPage,
  // }
];

export default routerConfig;
