'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');

class H5Service extends Service {

  async delOrRecover(options, type) {
    let {h5_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-h5', {'soft_delete': type}, {
      where: {h5_id}
    });
  }

  async listOrRecovery(options, type) {
    const {pageNum = 1, pageSize = 10, name = null, title = null, put = null} = options;
    let where = {'soft_delete': type};
    let like = {};
    name ? like = Object.assign({}, like, {name}) : void 0;
    title ? like = Object.assign({}, like, {title}) : void 0;
    put ? where = Object.assign({}, where, {put}) : void 0;
    const {sql} = this.app;
    return await sql.select('evy-h5', {
      where,
      like,
      columns: ['h5_id', 'name', 'title', 'description', 'put', 'version', 'env', 'js_url', 'css_url', 'update_time', 'create_time'],
      orders: [['update_time', 'desc']],
      limit: pageSize,
      offset: (Number(pageNum) - 1) * pageSize,
    });
  }

  async view(options) {
    const {sql} = this.app;
    const {id} = options;
    return await sql.select('evy-h5', {
      columns: ['js_url', 'css_url', 'title'],
      where: {'soft_delete': 0, 'h5_id': id}
    });
  }

  async count(type) {
    const {mysql} = this.app;
    return await mysql.count('evy-h5', {'soft_delete': type});
  }

  async insert(options) {
    let {name, title, description, put, version, env, js_url, css_url} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-h5',
      {
        h5_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        name, title, description, put, version, env, js_url, css_url
      }
    );
  }

  async update(options) {
    let {h5_id, name, title, description, put, version, env, js_url, css_url} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.update('evy-h5',
      {
        update_time: literals.now,
        name, title, description, put, version, env, js_url, css_url
      }, {
        where: {h5_id}
      }
    );
  }

}

module.exports = H5Service;