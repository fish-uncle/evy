'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');

class AuthService extends Service {

  async delOrRecover(options, type) {
    let {auth_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-auth', {'soft_delete': type}, {
      where: {
        auth_id
      }
    });
  }

  async all() {
    const {sql} = this.app;
    return await sql.select('evy-auth', {
      where: {'soft_delete': 0,},
      columns: ['auth_id', 'title'],
      orders: [['update_time', 'desc'], ['menu', 'desc']],
    });
  }

  async listOrRecovery(options, type) {
    const {pageNum = 1, pageSize = 10, title = null} = options;
    const {sql} = this.app;
    let where = {'soft_delete': type};
    let like = {};
    title ? like = Object.assign({}, like, {title}) : void 0;
    return await sql.select('evy-auth', {
      where,
      like,
      columns: ['auth_id', 'title', 'remark', 'url', 'menu', 'update_time', 'create_time'],
      orders: [['update_time', 'desc'], ['menu', 'desc']],
      limit: pageSize,
      offset: (Number(pageNum) - 1) * pageSize,
    });
  }

  async count(type) {
    const {mysql} = this.app;
    return await mysql.count('evy-auth', {'soft_delete': type});
  }

  async insert(options) {
    let {title, remark, url, menu} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-auth',
      {
        auth_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        title, remark, url, menu
      }
    );
  }

  async update(options) {
    let {auth_id, title, remark, url, menu} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.update('evy-auth',
      {
        update_time: literals.now,
        title, remark, url, menu
      }, {
        where: {auth_id}
      }
    );
  }

}

module.exports = AuthService;