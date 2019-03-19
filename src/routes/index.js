import dynamic from 'dva/dynamic';

// 首页
export const IndexPage = dynamic({
  component: () => import('./IndexPage')
});

// 用户中心
export const UserPage = dynamic({
  component: () => import('./UserPage')
});

// 应用列表
export const AppPage = dynamic({
  component: () => import('./AppPage')
});

// 角色管理
export const RolePage = dynamic({
  component: () => import('./RolePage')
});


