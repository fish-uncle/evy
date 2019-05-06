'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {

  async all() {
    const ctx = this.ctx;
    const {role} = ctx.service;
    let result;
    try {
      result = await role.all();
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result}});
  }

  async list() {
    const ctx = this.ctx;
    const {role} = ctx.service;
    let result, total;
    try {
      result = await role.listOrRecovery(ctx.query, 0);
      total = await role.count(0);
    } catch (err) {
      console.log(err);
      result = ctx.json.error();
    }
    ctx.body = ctx.json.success({data: {list: result, total: total}});
  }

  async recovery() {
    const ctx = this.ctx;
    const {role} = ctx.service;
    let result, total;
    try {
      result = await role.listOrRecovery(ctx.query, 1);
      total = await role.count(1);
      ctx.body = ctx.json.success({data: {list: result, total: total}});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async insert() {
    const ctx = this.ctx;
    const {role} = ctx.service;
    try {
      await role.insert(ctx.request.body);
      ctx.body = ctx.json.success({msg: '添加成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async update() {
    const ctx = this.ctx;
    const {role} = ctx.service;
    try {
      await role.update(ctx.request.body);
      ctx.body = ctx.json.success({msg: '更新成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async del() {
    const ctx = this.ctx;
    const {role} = ctx.service;
    try {
      await role.delOrRecover(ctx.request.body, 1);
      ctx.body = ctx.json.success({msg: '删除成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

  async recover() {
    const ctx = this.ctx;
    const {role} = ctx.service;
    try {
      await role.delOrRecover(ctx.request.body, 0);
      ctx.body = ctx.json.success({msg: '恢复成功'});
    } catch (err) {
      console.log(err);
      ctx.body = ctx.json.error();
    }
  }

}

module.exports = RoleController;