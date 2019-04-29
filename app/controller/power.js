'use strict';

const Controller = require('egg').Controller;

class PowerController extends Controller {

  async all() {
    const ctx = this.ctx;
    const {power} = ctx.service;
    let result;
    try {
      result = await power.all(ctx.request.body);
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result}});
  }

  async select() {
    const ctx = this.ctx;
    const {power} = ctx.service;
    let result, checkAdmin;
    try {
      checkAdmin = await power.check(ctx.request.body);
      if (checkAdmin > 0) {
        result = await power.selectAll();
      } else {
        result = await power.select(ctx.request.body);
      }
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result}});
  }

  async update() {
    const ctx = this.ctx;
    const {power} = ctx.service;
    let checkAdmin;
    try {
      checkAdmin = await power.check(ctx.request.body);
      if (checkAdmin <= 0) {
        await power.update(ctx.request.body);
      }
    } catch (err) {
      console.log(err);
      ctx.json.error();
    }
    ctx.body = ctx.json.success({msg: '修改成功'});
  }

}

module.exports = PowerController;