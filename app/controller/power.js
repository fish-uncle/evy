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

  async selectMenu() {
    const ctx = this.ctx;
    const {power, menu} = ctx.service;
    let result, checkAdmin;
    try {
      checkAdmin = await power.check(ctx.request.body);
      if (checkAdmin > 0) {
        result = await menu.all();
      } else {
        result = await power.selectMenu(ctx.request.body);
      }
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result}});
  }

  async selectAuth() {
    const ctx = this.ctx;
    const {power, auth} = ctx.service;
    let result, checkAdmin;
    try {
      checkAdmin = await power.check(ctx.request.body);
      if (checkAdmin > 0) {
        result = await auth.all();
      } else {
        result = await power.selectAuth(ctx.request.body);
      }
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result}});
  }

  async updateMenu() {
    const ctx = this.ctx;
    const {power} = ctx.service;
    let checkAdmin;
    try {
      checkAdmin = await power.check(ctx.request.body);
      if (checkAdmin <= 0) {
        await power.updateMenu(ctx.request.body);
      }
    } catch (err) {
      console.log(err);
      ctx.json.error();
    }
    ctx.body = ctx.json.success({msg: '修改成功'});
  }

  async updateAuth() {
    const ctx = this.ctx;
    const {power} = ctx.service;
    let checkAdmin;
    try {
      checkAdmin = await power.check(ctx.request.body);
      if (checkAdmin <= 0) {
        await power.updateAuth(ctx.request.body);
      }
    } catch (err) {
      console.log(err);
      ctx.json.error();
    }
    ctx.body = ctx.json.success({msg: '修改成功'});
  }

}

module.exports = PowerController;