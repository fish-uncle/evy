'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');

class MenuService extends Service {

  async auth() {
    const {mysql} = this.app;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': 1,},
      columns: ['menu_id', 'title', 'icon', 'nexus', 'type', 'url'],
      orders: [['sort'], ['update_time', 'desc']],
    });
  }

  async all() {
    const {mysql} = this.app;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': 1,},
      columns: ['menu_id', 'title'],
      orders: [['sort'], ['update_time', 'desc']],
    });
  }

  async delOrRecover(options, type) {
    let {menu_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-menu', {'soft_delete': type}, {
      where: {
        menu_id
      }
    });
  }

  async listOrRecovery(page, type) {
    const {mysql} = this.app;
    return await mysql.select('evy-menu', {
      where: {'soft_delete': type,},
      columns: ['menu_id', 'title', 'icon', 'nexus', 'type', 'url', 'sort', 'update_time'],
      orders: [['sort'], ['update_time', 'desc']],
      limit: 10,    // 返回数据量
      offset: (Number(page) - 1) * 10, // 数据偏移量
    });
  }

  async count() {
    const {mysql} = this.app;
    return await mysql.count('evy-menu', {'soft_delete': 1});
  }

  async insert(options) {
    let {title, type, url, sort, icon, nexus} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-menu',
      {
        menu_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        title, type, url, sort, icon, nexus
      }
    );
  }

  async update(options) {
    let {menu_id, title, type, url, sort, icon, nexus} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.update('evy-menu',
      {
        update_time: literals.now,
        title, type, url, sort, icon, nexus
      }, {
        where: {
          menu_id
        }
      }
    );
  }

}

module.exports = MenuService;