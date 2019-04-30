'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');
const format = require('date-fns/format');

class H5Service extends Service {

  async delOrRecover(options, type) {
    let {h5_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-h5', {'soft_delete': type}, {
      where: {
        h5_id
      }
    });
  }

  async listOrRecovery(page, type) {
    const {mysql} = this.app;
    return await mysql.select('evy-h5', {
      where: {'soft_delete': type,},
      columns: ['h5_id', 'name', 'title', 'description', 'release', 'version', 'env', 'js_url', 'css_url', 'update_time', 'create_time'],
      orders: [['update_time', 'desc']],
      limit: 10,    // 返回数据量
      offset: (Number(page) - 1) * 10, // 数据偏移量
    });
  }

  async count() {
    const {mysql} = this.app;
    return await mysql.count('evy-h5', {'soft_delete': 1});
  }

  async insert(options) {
    let {name, title, description, release, version, env, js_url, css_url} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-h5',
      {
        h5_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        name, title, description, release, version, env, js_url, css_url
      }
    );
  }

  async update(options) {
    let {h5_id, name, title, description, release, version, env, js_url, css_url} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.update('evy-h5',
      {
        update_time: literals.now,
        name, title, description, release, version, env, js_url, css_url
      }, {
        where: {
          h5_id
        }
      }
    );
  }

}

module.exports = H5Service;