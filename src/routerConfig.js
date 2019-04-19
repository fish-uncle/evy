import {
  IndexPage,
  UserPage,
  UserRecovery,
  AppPage,
  AppRecovery,
  AuthPage,
  AuthRecovery,
  ModulePage,
  RolePage,
  RoleRecovery,
  LoginPage,
  Error403Page,
  Error404Page,
  Error500Page,
  ModuleRecovery,
  MenuPage,
  MenuRecovery,
  H5Page,
  H5Recovery,
  ExamplePage,
  PowerPage
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
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/403',
    component: Error403Page,
  },
  {
    path: '/404',
    component: Error404Page,
  },
  {
    path: '/500',
    component: Error500Page,
  },
  {
    path: '/user',
    component: UserPage,
  },
  {
    path: '/user/recovery',
    component: UserRecovery,
  },
  {
    path: '/role',
    component: RolePage,
  },
  {
    path: '/role/recovery',
    component: RoleRecovery,
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
    path: '/auth',
    component: AuthPage,
  },
  {
    path: '/auth/recovery',
    component: AuthRecovery,
  },
  {
    path: '/module',
    component: ModulePage,
  },
  {
    path: '/menu',
    component: MenuPage,
  },
  {
    path: '/menu/recovery',
    component: MenuRecovery,
  },
  {
    path: '/module/recovery',
    component: ModuleRecovery,
  },
  {
    path: '/h5',
    component: H5Page,
  },
  {
    path: '/h5/recovery',
    component: H5Recovery,
  },
  {
    path: '/example',
    component: ExamplePage,
  },
  {
    path: '/power',
    component: PowerPage
  }
  // {
  //   path: '/news',
  //   component: NewsPage,
  // }
];

export default routerConfig;
