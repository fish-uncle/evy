import dynamic from 'dva/dynamic';

// 登录
export const LoginPage = dynamic({
  component: () => import('./LoginPage')
});

// 错误403
export const Error403Page = dynamic({
  component: () => import('./Error403')
});

// 错误404
export const Error404Page = dynamic({
  component: () => import('./Error404')
});

// 错误500
export const Error500Page = dynamic({
  component: () => import('./Error500')
});

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




