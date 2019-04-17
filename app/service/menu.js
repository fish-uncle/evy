'use strict';

const Service = require('egg').Service;

class MenuCenterService extends Service {

  async auth() {
    const {mysql} = this.app;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': 1,},
      columns: ['menu_id', 'title', 'icon', 'nexus', 'type', 'url'],
      orders: [['sort'], ['update_time', 'desc']],
    });
  }

  async listOrRecovery(page, type) {
    const {mysql} = this.app;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': type,},
      columns: ['menu_id', 'title', 'icon', 'nexus', 'type', 'url', 'sort'],
      orders: [['sort'], ['update_time', 'desc']],
      limit: 10,    // 返回数据量
      offset: (Number(page) - 1) * 10, // 数据偏移量
    });
  }

  async count() {
    const {mysql} = this.app;
    return await mysql.count('evy-menu', {'soft_delete': 1});
  }

}

module.exports = MenuCenterService;