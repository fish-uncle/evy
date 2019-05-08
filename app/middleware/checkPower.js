'use strict';
module.exports = _ => {
  return async function checkPower(ctx, next) {
    await next();
    const {user, power} = ctx.service;
    const user_id = ctx.cookies.get('EVY_ID', {encrypt: true});
    const detail = await user.detail(user_id);
    const checkAdmin = await power.check(detail[0]);
    const url = ctx.url.split('?')[0];
    if (checkAdmin <= 0) {
      let r = await power.checkPower(url);
      if (r.length <= 0) {
        ctx.body = {
          code: 403,
          data: '',
          success: false,
          msg: '权限不足'
        }
      }
    }
  };
};