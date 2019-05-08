'use strict';

const Controller = require('../../core/base_controller');

class PowerController extends Controller {

  async all() {
    const ctx = this.ctx;
    const {power} = ctx.service;
    let result;
    try {
      result = await power.all();
      this.success({data: {list: result}});
    } catch (err) {
      this.error(err);
    }
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
      this.success({data: {list: result}});
    } catch (err) {
      this.error(err);
    }
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
      this.success({data: {list: result}});
    } catch (err) {
      this.error(err);
    }
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
      this.success({msg: '修改成功'});
    } catch (err) {
      this.error(err);
    }
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
      this.success({msg: '修改成功'});
    } catch (err) {
      this.error(err);
    }
  }

}

module.exports = PowerController;