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

  async listOrRecovery(page, type) {
    const {mysql} = this.app;
    return await mysql.select('evy-auth', {
      where: {'soft_delete': type,},
      columns: ['auth_id', 'title', 'remark', 'url', 'update_time', 'create_time'],
      orders: [['update_time', 'desc']],
      limit: 10,    // 返回数据量
      offset: (Number(page) - 1) * 10, // 数据偏移量
    });
  }

  async count() {
    const {mysql} = this.app;
    return await mysql.count('evy-auth', {'soft_delete': 1});
  }

  async insert(options) {
    let {title, remark, url} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-auth',
      {
        auth_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        title, remark, url
      }
    );
  }

  async update(options) {
    let {auth_id, title, remark, url} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.update('evy-auth',
      {
        update_time: literals.now,
        title, remark, url
      }, {
        where: {
          auth_id
        }
      }
    );
  }

}

module.exports = AuthService;