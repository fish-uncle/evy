'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {

  async login() {
    const ctx = this.ctx;
    const {login} = ctx.service;
    let result, user, user_id;
    try {
      result = await login.login(ctx.request.body);
      if (result === 1) {
        ctx.body = ctx.json.success({msg: '登录成功'});
        user = await login.select(ctx.request.body);
        user_id = user[0].user_id;
        // console.log(ctx.cookies.get('EVY_ID', {
        //   encrypt: true,
        // }));
        ctx.cookies.set('EVY_ID', user_id, {encrypt: true, maxAge: 1000 * 60 * 60 * 24})
      } else {
        ctx.body = ctx.json.error({msg: '用户名或密码错误'});
      }
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

}

module.exports = LoginController;