'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');

class RoleService extends Service {

  async all() {
    const {mysql} = this.app;
    return await mysql.select('evy-role', {
      where: {'soft_delete': 1,},
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

  async listOrRecovery(page, type) {
    const {mysql} = this.app;
    return await mysql.select('evy-role', {
      where: {'soft_delete': type,},
      columns: ['role_id', 'title', 'admin', 'update_time', 'create_time'],
      orders: [['update_time', 'desc']],
      limit: 10,    // 返回数据量
      offset: (Number(page) - 1) * 10, // 数据偏移量
    });
  }

  async count() {
    const {mysql} = this.app;
    return await mysql.count('evy-role', {'soft_delete': 1});
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