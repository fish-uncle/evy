'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');
const format = require('date-fns/format');

class MenuCenterService extends Service {

  async listOrRecovery(page, type) {
    const {mysql} = this.app;
    return await mysql.select('evy-user', {
      where: {'soft_delete': type,},
      columns: ['user_id', 'employee_id', 'sex', 'pay', 'phone', 'email', 'role', 'station',
        'remark', 'bank_address', 'native_address', 'bank_card', 'real_name', 'type',
        'birth_time', 'join_time', 'nation', 'marriage', 'avatar', 'update_time'
      ],
      limit: 10,    // 返回数据量
      offset: (Number(page) - 1) * 10, // 数据偏移量
      orders: [['update_time', 'desc']],
    });
  }

  async delOrRecover(options, type) {
    let {user_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-user', {'soft_delete': type}, {
      where: {
        user_id
      }
    });
  }

  async count() {
    const {mysql} = this.app;
    return await mysql.count('evy-user', {'soft_delete': 1});
  }

  async insert(options) {
    let {bank_address, bank_card, birth_time, email, employee_id, join_time, marriage, nation, pay, phone, real_name, remark, role, sex, station} = options;
    const {mysql} = this.app;
    birth_time = format(birth_time, 'YYYY-MM-DD HH:mm:ss');
    join_time = format(join_time, 'YYYY-MM-DD HH:mm:ss');
    const {literals} = mysql;
    return await mysql.insert('evy-user',
      {
        user_id: uuid(),
        birth_time,
        create_time: literals.now,
        join_time,
        update_time: literals.now,
        bank_address,
        bank_card,
        email,
        employee_id,
        marriage,
        nation,
        station,
        pay,
        phone,
        real_name,
        remark,
        role,
        sex
      }
    );
  }

  async adminSet(options, type) {
    let {user_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-user', {'type': type}, {
      where: {
        user_id
      }
    });
  }

  async update(options) {
    let {user_id, bank_address, bank_card, birth_time, email, employee_id, join_time, marriage, nation, pay, phone, real_name, remark, role, sex, station} = options;
    const {mysql} = this.app;
    birth_time = format(birth_time, 'YYYY-MM-DD HH:mm:ss');
    join_time = format(join_time, 'YYYY-MM-DD HH:mm:ss');
    const {literals} = mysql;
    return await mysql.update('evy-user',
      {
        birth_time,
        join_time,
        update_time: literals.now,
        bank_address,
        bank_card,
        email,
        employee_id,
        marriage,
        nation,
        station,
        pay,
        phone,
        real_name,
        remark,
        role,
        sex
      }, {
        where: {
          user_id
        }
      }
    );
  }

}

module.exports = MenuCenterService;