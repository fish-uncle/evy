'use strict';

const Service = require('egg').Service;

class UserService extends Service {

  async user() {
    const {sql} = this.app;
    return await sql.select('evy-user', {
      columns: ['user_id', 'employee_id', 'sex', 'pay', 'phone', 'email', 'role', 'station', 'status',
        'remark', 'bank_address', 'native_address', 'native_address_detail', 'bank_card', 'real_name', 'type',
        'birth_time', 'join_time', 'nation', 'marriage', 'update_time', 'create_time', 'soft_delete'
      ],
      orders: [['update_time', 'desc']],
    });
  }

}

module.exports = UserService;