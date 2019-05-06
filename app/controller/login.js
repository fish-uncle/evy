'use strict';

const Controller = require('../core/base_controller');

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
        this.error({msg: '用户名或密码错误'});
      }
    } catch (err) {
      this.error(err);
    }
  }

}

module.exports = LoginController;