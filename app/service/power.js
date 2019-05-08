'use strict';

const Service = require('egg').Service;

class PowerService extends Service {

  async all() {
    const {mysql} = this.app;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': 0,},
      columns: ['menu_id', 'title', 'nexus'],
      orders: [['sort', 'asc'], ['update_time', 'desc']],
    });
  }

  async checkPower(url) {
    const {mysql} = this.app;
    return await mysql.query(`SELECT a.id FROM \`evy-auth\` AS a LEFT JOIN \`evy-role-auth\` AS b ON a.auth_id=b.auth WHERE soft_delete=0 AND url='${url}'`)
  }

  async check(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.count('evy-role', {'soft_delete': 0, admin: 1, role_id: role});
  }

  async selectMenu(options) {
    const {sql} = this.app;
    const {role} = options;
    return await sql.select('evy-role-menu', {
      where: {'role': role},
      columns: ['menu']
    });
  }

  async selectAuth(options) {
    const {sql} = this.app;
    const {role} = options;
    return await sql.select('evy-role-auth', {
      where: {'role': role},
      columns: ['auth']
    });
  }

  async updateMenu(options) {
    const {mysql} = this.app;
    const {role, list} = options;
    await mysql.delete('evy-role-menu', {'role': role});
    list.map(async item => {
      await mysql.insert('evy-role-menu', {'role': role, menu: item});
    });
  }

  async updateAuth(options) {
    const {mysql} = this.app;
    const {role, list} = options;
    await mysql.delete('evy-role-auth', {'role': role});
    list.map(async item => {
      await mysql.insert('evy-role-auth', {'role': role, auth: item});
    });
  }

}

module.exports = PowerService;