'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');

class ApplicationService extends Service {

  async delOrRecover(options, type) {
    let {app_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-app', {'soft_delete': type}, {
      where: {app_id}
    });
  }

  async all() {
    const {mysql} = this.app;
    return await mysql.select('evy-app', {
      where: {'soft_delete': 0},
      columns: ['app_id', 'cn_title', 'en_title'],
      orders: [['update_time', 'desc']],
    });
  }

  async listOrRecovery(options, type) {
    const {pageNum = 1, pageSize = 10, cn_title = null, en_title = null, version = null, update = null} = options;
    const {sql} = this.app;
    let where = {'soft_delete': type};
    let like = {};
    cn_title ? like = Object.assign({}, like, {cn_title}) : void 0;
    en_title ? like = Object.assign({}, like, {en_title}) : void 0;
    version ? where = Object.assign({}, where, {version}) : void 0;
    update ? where = Object.assign({}, where, {update}) : void 0;
    return await sql.select('evy-app', {
      where,
      like,
      columns: ['app_id', 'cn_title', 'en_title', 'version', 'icon', 'description', 'update', 'associate_url', 'update_time', 'create_time'],
      orders: [['update_time', 'desc']],
      limit: pageSize,
      offset: (Number(pageNum) - 1) * pageSize,
    });
  }

  async count(type) {
    const {mysql} = this.app;
    return await mysql.count('evy-app', {'soft_delete': type});
  }

  async insert(options) {
    let {cn_title, en_title, version, icon, description, update, associate_url} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-app',
      {
        app_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        cn_title, en_title, version, icon, description, update, associate_url
      }
    );
  }

  async update(options) {
    let {app_id, cn_title, en_title, version, icon, description, update, associate_url} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.update('evy-app',
      {
        update_time: literals.now,
        cn_title, en_title, version, icon, description, update, associate_url
      }, {
        where: {app_id}
      }
    );
  }

}

module.exports = ApplicationService;