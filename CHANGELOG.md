# 更新日志

## [1.0.0] - 2019-05-08
### 新增
* 添加 登录校验及鉴权
* 添加 h5 管理后的预览
### 更新
* 接口鉴权
### 备注
* 至此一个后台系统的基础功能都已完成，上传图片由于大家所用OSS\CDN系统各不相同，并没有去做

## [0.1.1] - 2019-05-06
### 新增
* 添加 egg-validate 校验请求参数
* 添加 sql 语句专用记录日志文件，方便排查错误
* 添加 base_controller.js
* 添加 sql.test.js 单元测试
* 添加 user 导出 excel
### 更新
* 更新初始化 sql 按项目版本罗列，方便日后针对版本的进行增加表
* 更新 access 与 gzip 从中间件改为插件形式

## [0.1.0] - 2019-05-05
### 新增
* 添加 insertCallBack,updateCallBack,deleteCallBack 方法处理表单提交前数据
* 添加 version 组件
* 添加 favicon
* 在 app 下添加 sql 方法解决 [egg-mysql](https://github.com/eggjs/egg/issues/2868) 无法支持模糊查询
### 修复
* 修复 loadCallBack 更新表格数据后，延迟显示问题
### 更新
* 字段 char(1) 改为 tinyint(3)

## [0.0.9] - 2019-04-30
### 新增
* H5 列表 增删改
### 更新
* 授权管理 权限点优化
* 授权列表 初始化数据完善
* 文档完善
* 优化右侧抽屉不配置 updateUrl 即不显示更新按钮
* 优化右侧抽屉不配置 insertUrl 即不显示添加按钮
### 修复
* 表单添加按钮置灰问题
* 页面切换后 pageNum 未初始化问题
* 修复表单组件 multiple 默认值为空数组问题
* 修复表单组件 0 和 false 的时候 显示为空

## [0.0.8] - 2019-04-29 
### 更新
* 前端表单校验规则自定义优化
* 授权管理 选择优化
* 新增版本依赖 history@4.7.2 为避免引起 [bug](https://github.com/ReactTraining/history/issues/677)

## [0.0.7] - 2019-04-26
### 新增
* 添加 formatter 方法处理表单提交前数据
### 更新
* 优化左侧菜单栏

## [0.0.6] - 2019-04-25
### 新增
* 授权管理 树形结构
* 权限列表 增加所属页面
* 登录页面 功能实现
### 修复
* ajax 回调错误提示框 bug
* ajax post 参数问题
* cascader 组件空数据更新问题
* [react 内存泄漏 bug](https://blog.csdn.net/softwarenb/article/details/81123389) Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
 in IndexPage (created by Connect(IndexPage))
### 更新
* antd 升级到 3.16.5
* 搜索组建优化

## [0.0.5] - 2019-04-19
### 新增
* 模块页面 增删改
* 角色列表 增删改
* 权限列表 增删改
* 添加级联的表单类型
### 修复
* [html-to-draftjs](https://github.com/jpuri/html-to-draftjs/issues/5) npm包一个空内容判断 bug

## [0.0.4] - 2019-04-18
### 新增
* 示例页面
* 菜单页面 增删改
* 应用页面 增删改
* 应用页面 sql
### 优化
* 样式使用 [antd](https://ant.design/docs/react/customize-theme-cn) 配置方便替换主题色
* 文档完善
### 修复
* 回收站搜索 bug
* 分页切换 bug

## [0.0.3] - 2019-04-17
### 新增
* 应用列表，模块列表，H5列表，示例页面，关于开发者

## [0.0.2] - 2019-04-16
### 新增
* 404,403,500 页面
* 登录 页面

## [0.0.1] - 2019-04-12
### 新增
* 详情组件添加拾色器
* 添加搜索导出三个按钮优化配置方式

## [0.0.0] - 2019-03-12
### 新增
* 初始化框架结构 

