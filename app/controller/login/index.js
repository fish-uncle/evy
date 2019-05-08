'use strict';

const Controller = require('../../core/base_controller');

class LoginController extends Controller {

  async login() {
    const ctx = this.ctx;
    const {login} = ctx.service;
    let result, user, user_id;
    try {
      result = await login.login(ctx.request.body);
      if (result === 1) {
        this.success({msg: '登录成功'});
        user = await login.select(ctx.request.body);
        user_id = user[0].user_id;
        this.user = user_id;
      } else {
        this.error(new Error('用户名或密码错误'), {msg: '用户名或密码错误'});
      }
    } catch (err) {
      this.error(err);
    }
  }

  async logout() {
    try {
      this.user = null;
      this.success({msg: '退出成功'});
    } catch (err) {
      this.error(err, {msg: '退出失败'});
    }
  }

}

module.exports = LoginController;