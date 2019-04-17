'use strict';

const Controller = require('egg').Controller;

class MenuController extends Controller {

  async auth() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    let result;
    try {
      result = await menu.auth();
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result}});
  }

  async list() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    const {pageNum = 1} = ctx.query;
    let result, total;
    try {
      result = await menu.listOrRecovery(pageNum, 1);
      total = await menu.count();
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result, total: total}});
  }

  async recovery() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    const {pageNum = 1} = ctx.query;
    let result, total;
    try {
      result = await menu.listOrRecovery(pageNum, 2);
      total = await menu.count();
      ctx.body = ctx.json.success({data: {list: result, total: total}});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

}

module.exports = MenuController;