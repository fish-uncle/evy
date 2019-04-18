'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');

class ApplicationService extends Service {

  async delOrRecover(options, type) {
    let {app_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-app', {'soft_delete': type}, {
      where: {
        app_id
      }
    });
  }

  async listOrRecovery(page, type) {
    const {mysql} = this.app;
    return await mysql.select('evy-app', {
      where: {'soft_delete': type,},
      columns: ['app_id', 'cn_title', 'en_title', 'version', 'icon', 'description', 'update', 'associate_url', 'update_time'],
      orders: [['update_time', 'desc']],
      limit: 10,    // 返回数据量
      offset: (Number(page) - 1) * 10, // 数据偏移量
    });
  }

  async count() {
    const {mysql} = this.app;
    return await mysql.count('evy-app', {'soft_delete': 1});
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
        where: {
          app_id
        }
      }
    );
  }

}

module.exports = ApplicationService;