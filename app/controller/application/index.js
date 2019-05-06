'use strict';

const Controller = require('../../core/base_controller');
const {rule_list} = require('./rule');

class ApplicationController extends Controller {

  async all() {
    const ctx = this.ctx;
    const {application} = ctx.service;
    let result;
    try {
      result = await application.all();
      this.success({data: {list: result}});
    } catch (err) {
      this.error(err);
    }
  }

  async list() {
    const ctx = this.ctx;
    const {application} = ctx.service;
    let result, total;
    try {
      ctx.validate(rule_list, ctx.query);
      try {
        result = await application.listOrRecovery(ctx.query, 0);
        total = await application.count(0);
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
    const {application} = ctx.service;
    let result, total;
    try {
      ctx.validate(rule_list, ctx.query);
      try {
        result = await application.listOrRecovery(ctx.query, 1);
        total = await application.count(1);
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
    const {application} = ctx.service;
    try {
      await application.insert(ctx.request.body);
      this.success({msg: '添加成功'});
    } catch (err) {
      this.error(err);
    }
  }

  async update() {
    const ctx = this.ctx;
    const {application} = ctx.service;
    try {
      await application.update(ctx.request.body);
      this.success({msg: '更新成功'});
    } catch (err) {
      this.error(err);
    }
  }

  async del() {
    const ctx = this.ctx;
    const {application} = ctx.service;
    try {
      await application.delOrRecover(ctx.request.body, 1);
      this.success({msg: '删除成功'});
    } catch (err) {
      this.error(err);
    }
  }

  async recover() {
    const ctx = this.ctx;
    const {application} = ctx.service;
    try {
      await application.delOrRecover(ctx.request.body, 0);
      this.success({msg: '恢复成功'});
    } catch (err) {
      this.error(err);
    }
  }

}

module.exports = ApplicationController;