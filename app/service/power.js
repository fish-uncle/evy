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

  async select(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.select('evy-role-auth', {
      where: {'soft_delete': 1,},
      columns: ['menu_id', 'title', 'nexus'],
      orders: [['sort'], ['update_time', 'desc']],
    });
  }

  async update(options) {
    const {mysql} = this.app;
    const {role} = options;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': 1,},
      columns: ['menu_id', 'title', 'nexus'],
      orders: [['sort'], ['update_time', 'desc']],
    });
  }

}

module.exports = PowerService;