'use strict';

const Service = require('egg').Service;

class MenuCenterService extends Service {

  async list() {
    const {mysql} = this.app;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': 1,},
      columns: ['menu_id', 'title', 'icon', 'nexus', 'type', 'url'],
      orders: [['sort'], ['update_time', 'desc']],
    });
  }

}

module.exports = MenuCenterService;