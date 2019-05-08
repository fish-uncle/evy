'use strict';

const Controller = require('../../core/base_controller');
const {rule_list} = require('./rule');

class H5Controller extends Controller {

  async list() {
    const ctx = this.ctx;
    const {h5} = ctx.service;
    let result, total;
    try {
      ctx.validate(rule_list, ctx.query);
      try {
        result = await h5.listOrRecovery(ctx.query, 0);
        total = await h5.count(0);
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
    const {h5} = ctx.service;
    let result, total;
    try {
      ctx.validate(rule_list, ctx.query);
      try {
        result = await h5.listOrRecovery(ctx.query, 1);
        total = await h5.count(1);
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
    const {h5} = ctx.service;
    try {
      await h5.insert(ctx.request.body);
      this.success({msg: '添加成功'});
    } catch (err) {
      this.error(err);
    }
  }

  async update() {
    const ctx = this.ctx;
    const {h5} = ctx.service;
    try {
      await h5.update(ctx.request.body);
      this.success({msg: '更新成功'});
    } catch (err) {
      this.error(err);
    }
  }

  async view() {
    const ctx = this.ctx;
    const {h5} = ctx.service;
    try {
      const view = await h5.view(ctx.query);
      const title = view[0].title;
      let jsHtml = '', cssHtml = '';
      view[0].js_url = view[0].js_url.split(',');
      view[0].css_url = view[0].css_url.split(',');
      const js = view[0].js_url.map(item => jsHtml += `<script src=${item}></script>`);
      const css = view[0].css_url.map(item => cssHtml += `<link rel='stylesheet' href=${item}/>`);
      ctx.body = `<html><head><title>${title}</title><meta charset='UTF-8'/>${css}</head><body>${js}</body></html>`;
    } catch (err) {
      this.error(err);
    }
  }

  async del() {
    const ctx = this.ctx;
    const {h5} = ctx.service;
    try {
      await h5.delOrRecover(ctx.request.body, 1);
      this.success({msg: '删除成功'});
    } catch (err) {
      this.error(err);
    }
  }

  async recover() {
    const ctx = this.ctx;
    const {h5} = ctx.service;
    try {
      await h5.delOrRecover(ctx.request.body, 0);
      this.success({msg: '恢复成功'});
    } catch (err) {
      this.error(err);
    }
  }

}

module.exports = H5Controller;