'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {

  async list() {
    const ctx = this.ctx;
    const {user} = ctx.service;
    const {page = 1} = ctx.query;
    let result, total;
    try {
      result = await user.list(page);
      total = await user.count();
      ctx.body = ctx.json.success({data: {list: result, total: total}});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async insert() {
    const ctx = this.ctx;
    const {user} = ctx.service;
    try {
      await user.insert(ctx.request.body);
      ctx.body = ctx.json.success({msg: '添加成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async update() {
    const ctx = this.ctx;
    const {user} = ctx.service;
    try {
      await user.update(ctx.request.body);
      ctx.body = ctx.json.success({msg: '更新成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

}

module.exports = MenuController;