'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v4');

class LoginService extends Service {

  async login(options) {
    let {phone, email, password} = options;
    const {mysql} = this.app;
    if (phone) {
      return await mysql.count('evy-user', {
        'soft_delete': 1,
        'status': 1,
        'phone': phone,
        'password': this.app.encrypt(password)
      });
    }
    if (email) {
      return await mysql.count('evy-user', {
        'soft_delete': 1,
        'status': 1,
        'email': email,
        'password': this.app.encrypt(password)
      });
    }
  }

  async select(options) {
    let {phone, email, password} = options;
    const {mysql} = this.app;
    if (phone) {
      return await mysql.select('evy-user', {
        where: {'soft_delete': 1, 'status': 1, 'phone': phone, 'password': this.app.encrypt(password)},
        columns: ['user_id'],
      });
    }
    if (email) {
      return await mysql.select('evy-user', {
        where: {'soft_delete': 1, 'status': 1, 'email': email, 'password': this.app.encrypt(password)},
        columns: ['user_id'],
      });
    }
  }

  async sign() {

  }
}

module.exports = LoginService;