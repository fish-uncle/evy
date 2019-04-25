'use strict';

const Controller = require('egg').Controller;

class ModuleController extends Controller {

  async list() {
    const ctx = this.ctx;
    const {module} = ctx.service;
    const {pageNum = 1} = ctx.query;
    let result, total;
    try {
      result = await module.listOrRecovery(pageNum, 1);
      total = await module.count();
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result, total: total}});
  }

  async recovery() {
    const ctx = this.ctx;
    const {module} = ctx.service;
    const {pageNum = 1} = ctx.query;
    let result, total;
    try {
      result = await module.listOrRecovery(pageNum, 2);
      total = await module.count();
      ctx.body = ctx.json.success({data: {list: result, total: total}});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async insert() {
    const ctx = this.ctx;
    const {module} = ctx.service;
    try {
      await module.insert(ctx.request.body);
      ctx.body = ctx.json.success({msg: '添加成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async update() {
    const ctx = this.ctx;
    const {module} = ctx.service;
    try {
      await module.update(ctx.request.body);
      ctx.body = ctx.json.success({msg: '更新成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async del() {
    const ctx = this.ctx;
    const {module} = ctx.service;
    try {
      await module.delOrRecover(ctx.request.body, 2);
      ctx.body = ctx.json.success({msg: '删除成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async recover() {
    const ctx = this.ctx;
    const {module} = ctx.service;
    try {
      await module.delOrRecover(ctx.request.body, 1);
      ctx.body = ctx.json.success({msg: '恢复成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

}

module.exports = ModuleController;