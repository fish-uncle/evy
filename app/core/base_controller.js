'use strict';
const {Controller} = require('egg');

class BaseController extends Controller {

  set user(value) {
    this.ctx.cookies.set('EVY_ID', value, {encrypt: true, maxAge: 1000 * 60 * 60 * 24})
  }

  get user() {
    return this.ctx.cookies.get('EVY_ID', {
      encrypt: true,
    })
  }

  success({msg = '请求成功', data = '', obj, code = 200}) {
    let result = {
      code: code,
      data: data,
      msg: msg,
      success: true
    };
    if (typeof obj === 'object') {
      result = Object.assign(result, obj)
    }
    this.ctx.body = result;
  }

  error(err, {msg = '请求失败', data = '', code = 500}) {
    this.coreLogger.error(err);
    this.ctx.body = {
      code: code,
      data: data,
      msg: msg,
      success: false
    };
  }

}

module.exports = BaseController;