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

  async listOrRecovery(page, type) {
    const {mysql} = this.app;
    return await mysql.select('evy-module', {
      where: {'soft_delete': type,},
      columns: ['module_id', 'cn_title', 'en_title', 'description', 'content', 'app', 'label', 'timing', 'update_time', 'start_time', 'end_time','create_time'],
      orders: [['update_time', 'desc']],
      limit: 10,    // 返回数据量
      offset: (Number(page) - 1) * 10, // 数据偏移量
    });
  }

  async count() {
    const {mysql} = this.app;
    return await mysql.count('evy-module', {'soft_delete': 1});
  }

  async insert(options) {
    let {cn_title, en_title, content, app, description, label, timing, start_time, end_time} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    return await mysql.insert('evy-module',
      {
        module_id: uuid(),
        create_time: literals.now,
        update_time: literals.now,
        cn_title, en_title, content, app, description, label, timing, start_time, end_time
      }
    );
  }

  async update(options) {
    let {module_id, cn_title, en_title, content, app, description, label, timing, start_time, end_time} = options;
    const {mysql} = this.app;
    const {literals} = mysql;
    start_time = format(start_time, 'YYYY-MM-DD HH:mm:ss');
    end_time = format(end_time, 'YYYY-MM-DD HH:mm:ss');
    return await mysql.update('evy-module',
      {
        update_time: literals.now,
        cn_title, en_title, content, app, description, label, timing, start_time, end_time
      }, {
        where: {
          module_id
        }
      }
    );
  }

}

module.exports = ModuleService;