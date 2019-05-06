'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');
const format = require('date-fns/format');

class ModuleService extends Service {

  async delOrRecover(options, type) {
    let {module_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-module', {'soft_delete': type}, {
      where: {
        module_id
      }
    });
  }

  async listOrRecovery(options, type) {
    const {page = 1, description = null, cn_title = null, en_title = null, timing = null, put = null} = options;
    let where = {'soft_delete': type};
    let like = {};
    description ? like = Object.assign({}, like, {description}) : void 0;
    cn_title ? like = Object.assign({}, like, {cn_title}) : void 0;
    en_title ? like = Object.assign({}, like, {en_title}) : void 0;
    timing ? where = Object.assign({}, where, {timing}) : void 0;
    put ? where = Object.assign({}, where, {put}) : void 0;
    const {sql} = this.app;
    return await sql('evy-module', {
      where,
      like,
      columns: ['module_id', 'cn_title', 'en_title', 'description', 'put', 'content', 'app', 'label', 'timing', 'update_time', 'start_time', 'end_time', 'create_time'],
      orders: [['update_time', 'desc']],
      limit: 10,    // 返回数据量
      offset: (Number(page) - 1) * 10, // 数据偏移量
    });
  }

  async count(type) {
    const {mysql} = this.app;
    return await mysql.count('evy-module', {'soft_delete': type});
  }

  async insert(options) {
    let {cn_title, en_title, content, app, description, label, timing, start_time, end_time, put} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-module',
      {
        module_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        cn_title, en_title, content, app, description, label, timing, start_time, end_time, put
      }
    );
  }

  async update(options) {
    let {module_id, cn_title, en_title, content, app, description, label, timing, start_time, end_time, put} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    start_time = format(start_time, 'YYYY-MM-DD HH:mm:ss');
    end_time = format(end_time, 'YYYY-MM-DD HH:mm:ss');
    label = label.join(',');
    return await mysql.update('evy-module',
      {
        update_time: literals.now,
        cn_title, en_title, content, app, description, label, timing, start_time, end_time, put
      }, {
        where: {
          module_id
        }
      }
    );
  }

}

module.exports = ModuleService;