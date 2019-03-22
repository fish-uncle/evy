'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {

  async list() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    let result;
    try {
      result = await menu.list();
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result}});
  }

}

module.exports = MenuController;