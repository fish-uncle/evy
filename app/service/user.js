'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');
const format = require('date-fns/format');

class UserService extends Service {

  async listOrRecovery(options, type) {
    const {pageNum = 1, pageSize = 10, real_name = null, employee_id = null, phone = null, sex = null} = options;
    const {sql} = this.app;
    let where = {'soft_delete': type};
    let like = {};
    real_name ? like = Object.assign({}, like, {real_name}) : void 0;
    employee_id ? like = Object.assign({}, like, {employee_id}) : void 0;
    phone ? like = Object.assign({}, like, {phone}) : void 0;
    sex ? where = Object.assign({}, where, {sex}) : void 0;
    return await sql.select('evy-user', {
      where,
      like,
      columns: ['user_id', 'employee_id', 'sex', 'pay', 'phone', 'email', 'role', 'station', 'status',
        'remark', 'bank_address', 'native_address', 'native_address_detail', 'bank_card', 'real_name', 'type',
        'birth_time', 'join_time', 'nation', 'marriage', 'avatar', 'update_time', 'create_time'
      ],
      limit: pageSize,
      offset: (Number(pageNum) - 1) * pageSize,
      orders: [['update_time', 'desc']],
    });
  }

  async delOrRecover(options, type) {
    let {user_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-user', {'soft_delete': type}, {
      where: {user_id}
    });
  }

  async detail(user_id) {
    const {sql} = this.app;
    return await sql.select('evy-user', {
      where: {user_id, 'soft_delete': 0},
      columns: ['user_id', 'employee_id', 'sex', 'pay', 'phone', 'email', 'role', 'station', 'status',
        'remark', 'bank_address', 'native_address', 'native_address_detail', 'bank_card', 'real_name', 'type',
        'birth_time', 'join_time', 'nation', 'marriage', 'avatar', 'update_time', 'create_time'
      ],
    });
  }

  async count(type) {
    const {mysql} = this.app;
    return await mysql.count('evy-user', {'soft_delete': type});
  }

  async insert(options) {
    let {bank_address, bank_card, birth_time, email, employee_id, join_time, status, native_address, native_address_detail, marriage, nation, pay, phone, real_name, remark, role, sex, station} = options;
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
        native_address_detail,
        native_address,
        email, status,
        employee_id,
        marriage,
        nation,
        station,
        pay,
        phone,
        real_name,
        remark,
        role,
        sex,
        password: this.app.encrypt('888888')
      }
    );
  }

  async password(options) {
    let {user_id} = options;
    const {mysql} = this.app;
    return await mysql.update('evy-user', {'password': this.app.encrypt('888888')}, {
      where: {user_id}
    });
  }

  async update(options) {
    let {user_id, bank_address, bank_card, birth_time, email, employee_id, join_time, status, native_address, native_address_detail, marriage, nation, pay, phone, real_name, remark, role, sex, station} = options;
    const {mysql} = this.app;
    birth_time = format(birth_time, 'YYYY-MM-DD HH:mm:ss');
    join_time = format(join_time, 'YYYY-MM-DD HH:mm:ss');
    native_address.length <= 0 ? native_address = null : void 0;
    const {literals} = mysql;
    return await mysql.update('evy-user',
      {
        birth_time,
        join_time,
        update_time: literals.now,
        bank_address,
        bank_card, status,
        email,
        employee_id,
        marriage,
        native_address_detail,
        native_address,
        nation,
        station,
        pay,
        phone,
        real_name,
        remark,
        role,
        sex
      }, {
        where: {user_id}
      }
    );
  }

}

module.exports = UserService;