'use strict';

const Service = require('egg').Service;

class PowerService extends Service {

  async all(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': 1,},
      columns: ['menu_id', 'title', 'nexus'],
      orders: [['sort'], ['update_time', 'desc']],
    });
  }

  async check(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.count('evy-role', {'soft_delete': 1, admin: 1, role_id: role});
  }

  async selectAll() {
    const {mysql} = this.app;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': 1,},
      columns: ['menu_id'],
      orders: [['sort'], ['update_time', 'desc']],
    });
  }

  async select(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.select('evy-role-menu', {
      where: {'role': role},
      columns: ['menu']
    });
  }

  async update(options) {
    const {mysql} = this.app;
    const {role, list} = options;
    await mysql.delete('evy-role-menu', {'role': role});
    list.map(async item => {
      await mysql.insert('evy-role-menu', {'role': role, menu: item});
    });

  }

}

module.exports = PowerService;