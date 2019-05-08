'use strict';
module.exports = _ => {
  return async function checkLogin(ctx, next) {
    await next();
    let body = ctx.body;
    if (!body) return;
    if (!ctx.cookies.get('EVY_ID', {encrypt: true,})) {
      ctx.body = {
        code: 401,
        data: '',
        success: false,
        msg: '未登录'
      }
    }
  };
};