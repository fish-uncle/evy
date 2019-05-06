'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');

class RoleService extends Service {

  async all() {
    const {mysql} = this.app;
    return await mysql.select('evy-role', {
      where: {'soft_delete': 0,},
      columns: ['role_id', 'title'],
      orders: [['update_time', 'desc']],
    });
  }

  async delOrRecover(options, type) {
    let {role_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-role', {'soft_delete': type}, {
      where: {
        role_id
      }
    });
  }

  async listOrRecovery(options, type) {
    const {page = 1, admin = null, title = null} = options;
    const {sql} = this.app;
    let where = {'soft_delete': type};
    let like = {};
    admin ? where = Object.assign({}, where, {admin}) : void 0;
    title ? like = Object.assign({}, like, {title}) : void 0;
    return await sql('evy-role', {
      where,
      like,
      columns: ['role_id', 'title', 'admin', 'update_time', 'create_time'],
      orders: [['update_time', 'desc']],
      limit: 10,
      offset: (Number(page) - 1) * 10,
    });
  }

  async count(type) {
    const {mysql} = this.app;
    return await mysql.count('evy-role', {'soft_delete': type});
  }

  async insert(options) {
    let {title, admin} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-role',
      {
        role_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        title, admin
      }
    );
  }

  async update(options) {
    let {role_id, title, admin} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.update('evy-role',
      {
        update_time: literals.now,
        title, admin
      }, {
        where: {
          role_id
        }
      }
    );
  }

}

module.exports = RoleService;