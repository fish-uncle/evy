'use strict';

const Controller = require('../../core/base_controller');
const {rule_list} = require('./rule');

class MenuController extends Controller {

  async auth() {
    const ctx = this.ctx;
    const {menu, user, power} = ctx.service;
    let result;
    try {
      const detail = await user.detail(this.user);
      const checkAdmin = await power.check(detail[0]);
      if (checkAdmin > 0) {
        result = await menu.allAuth();
      } else {
        result = await menu.auth(detail[0]);
      }
      this.success({data: {list: result}});
    } catch (err) {
      this.error(err);
    }
  }

  async all() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    let result;
    try {
      result = await menu.all();
      this.success({data: {list: result}});
    } catch (err) {
      this.error(err);
    }
  }

  async list() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    let result, total;
    try {
      ctx.validate(rule_list, ctx.query);
      try {
        result = await menu.listOrRecovery(ctx.query, 0);
        total = await menu.count(0);
        this.success({data: {list: result, total: total}});
      } catch (err) {
        this.error(err);
      }
    } catch (e) {
      this.error(e, {data: {list: [], total: 0}, msg: '请求参数有误'});
    }
  }

  async recovery() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    let result, total;
    try {
      ctx.validate(rule_list, ctx.query);
      try {
        result = await menu.listOrRecovery(ctx.query, 1);
        total = await menu.count(1);
        this.success({data: {list: result, total: total}});
      } catch (err) {
        this.error(err);
      }
    } catch (e) {
      this.error(e, {data: {list: [], total: 0}, msg: '请求参数有误'});
    }
  }

  async insert() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    try {
      await menu.insert(ctx.request.body);
      this.success({msg: '添加成功'});
    } catch (err) {
      this.error(err);
    }
  }

  async update() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    try {
      await menu.update(ctx.request.body);
      this.success({msg: '更新成功'});
    } catch (err) {
      this.error(err);
    }
  }

  async del() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    try {
      await menu.delOrRecover(ctx.request.body, 1);
      this.success({msg: '删除成功'});
    } catch (err) {
      this.error(err);
    }
  }

  async recover() {
    const ctx = this.ctx;
    const {menu} = ctx.service;
    try {
      await menu.delOrRecover(ctx.request.body, 0);
      this.success({msg: '恢复成功'});
    } catch (err) {
      this.error(err);
    }
  }

}

module.exports = MenuController;