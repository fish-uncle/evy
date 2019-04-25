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
    let result;
    try {
      result = await power.select(ctx.request.body);
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result}});
  }

  async update() {
    const ctx = this.ctx;
    const {power} = ctx.service;
    let result;
    try {
      result = await power.update(ctx.request.body);
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result}});
  }

}

module.exports = PowerController;