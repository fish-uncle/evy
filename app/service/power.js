'use strict';

const Service = require('egg').Service;

class PowerService extends Service {

  async all(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': 0,},
      columns: ['menu_id', 'title', 'nexus'],
      orders: [['sort'], ['update_time', 'desc']],
    });
  }

  async check(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.count('evy-role', {'soft_delete': 0, admin: 1, role_id: role});
  }

  async selectMenu(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.select('evy-role-menu', {
      where: {'role': role},
      columns: ['menu']
    });
  }

  async selectAuth(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.select('evy-role-auth', {
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