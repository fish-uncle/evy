'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');

class MenuService extends Service {

  async auth(options) {
    const {sql} = this.app;
    return await sql.query(`SELECT menu_id,title,icon,nexus,type,url FROM \`evy-menu\` AS a LEFT JOIN \`evy-role-menu\` AS b ON a.menu_id = b.menu WHERE a.soft_delete = 0 AND a.display = 1 AND b.role='${options.role}' ORDER BY sort, update_time DESC`);
  }

  async allAuth() {
    const {sql} = this.app;
    return await sql.select('evy-menu', {
      where: {'soft_delete': 0, display: 1},
      columns: ['menu_id', 'title', 'nexus', 'icon', 'url', 'type'],
      orders: [['sort', 'asc'], ['update_time', 'desc']],
    });
  }

  async all() {
    const {sql} = this.app;
    return await sql.select('evy-menu', {
      where: {'soft_delete': 0},
      columns: ['menu_id', 'title'],
      orders: [['sort', 'asc'], ['update_time', 'desc']],
    });
  }

  async delOrRecover(options, type) {
    let {menu_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-menu', {'soft_delete': type}, {
      where: {menu_id}
    });
  }

  async listOrRecovery(options, _type) {
    const {pageNum = 1, pageSize = 10, title = null, url = null, type = null} = options;
    let where = {'soft_delete': _type};
    let like = {};
    title ? like = Object.assign({}, like, {title}) : void 0;
    url ? like = Object.assign({}, like, {url}) : void 0;
    type ? where = Object.assign({}, where, {type}) : void 0;
    const {mysql} = this.app;
    return await mysql.select('evy-menu', {
      where,
      like,
      columns: ['menu_id', 'title', 'icon', 'nexus', 'type', 'url', 'sort', 'update_time', 'create_time', 'display'],
      orders: [['sort', 'asc'], ['update_time', 'desc']],
      limit: pageSize,
      offset: (Number(pageNum) - 1) * pageSize,
    });
  }

  async count(type) {
    const {mysql} = this.app;
    return await mysql.count('evy-menu', {'soft_delete': type});
  }

  async insert(options) {
    let {title, type, url, sort, icon, nexus, display} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-menu',
      {
        menu_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        display,
        title, type, url, sort, icon, nexus
      }
    );
  }

  async update(options) {
    let {menu_id, title, type, url, sort, icon, nexus, display} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.update('evy-menu',
      {
        update_time: literals.now,
        title, type, url, sort, icon, nexus, display
      }, {
        where: {menu_id}
      }
    );
  }

}

module.exports = MenuService;