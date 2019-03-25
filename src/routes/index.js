import dynamic from 'dva/dynamic';

// 首页
export const IndexPage = dynamic({
  component: () => import('./IndexPage')
});

// 用户中心
export const UserPage = dynamic({
  component: () => import('./UserPage')
});

// 用户中心
export const UserRecovery = dynamic({
  component: () => import('./UserRecovery')
});

// 应用列表
export const AppPage = dynamic({
  component: () => import('./AppPage')
});

// 应用列表回收站
export const AppRecovery = dynamic({
  component: () => import('./AppRecovery')
});

// 模块列表
export const ModulePage = dynamic({
  component: () => import('./ModulePage')
});

// 角色管理
export const RolePage = dynamic({
  component: () => import('./RolePage')
});

// // 消息中心
// export const NewsPage = dynamic({
//   component: () => import('./NewsPage')
// });




