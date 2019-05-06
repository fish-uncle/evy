'use strict';
const uuid = require('uuid/v4');
const crypto = require('crypto');
const chalk = require('chalk');
module.exports = {
  uuid() {
    return uuid()
  },
  get encrypt() {
    return str => {
      let secret = this.config.keys;
      secret instanceof Array ? secret = secret[0] : void 0;
      const cipher = crypto.createCipher('aes192', secret);
      let enc = cipher.update(str, 'utf8', 'hex');
      enc += cipher.final('hex');
      return enc;
    }
  },
  get decrypt() {
    return str => {
      let secret = this.config.keys;
      secret instanceof Array ? secret = secret[0] : void 0;
      const decipher = crypto.createDecipher('aes192', secret);
      let dec = decipher.update(str, 'hex', 'utf8');
      dec += decipher.final('utf8');
      return dec;
    }
  },
  get sql() {
    return async (table, obj = {}) => {
      let columns = '', orders = '', where = '', like = {};
      if (obj.columns) {
        for (let i = 0; i < obj.columns.length; i++) {
          if (i === obj.columns.length - 1) {
            columns += `\`${obj.columns[i]}\``
          } else {
            columns += `\`${obj.columns[i]}\`,`
          }
        }
      } else {
        columns = '*'
      }
      let query = `SELECT ${columns} FROM \`${table}\``;

      if (obj.where) {
        for (let i in  obj.where) {
          obj.where[i] = {
            type: 'where',
            value: obj.where[i]
          };
        }
      }
      if (obj.like) {
        for (let i in  obj.like) {
          obj.like[i] = {
            type: 'like',
            value: obj.like[i]
          };
        }
      }

      like = Object.assign({}, obj.like, obj.where);

      function format(value) {
        if (typeof value === 'number')
          return value;
        if (typeof value === 'string') {
          return `\'${value}\'`
        }
      }

      for (let i in  like) {
        like[i].type === 'like' ? where += `${i} LIKE \'%${like[i].value}%\' AND ` : where += `${i} = ${format(like[i].value)} AND `
      }
      where = `${where.replace(/^(.*)AND /, '$1')}`;
      if (obj.like || obj.where) {
        query = query + ` WHERE ${where}`
      }
      if (obj.orders) {
        for (let i = 0; i < obj.orders.length; i++) {
          if (i === obj.orders.length - 1) {
            orders += obj.orders[i][0] + ' ' + obj.orders[i][1]
          } else {
            orders += obj.orders[i][0] + ' ' + obj.orders[i][1] + ','
          }
        }
        query = query + ` ORDER BY ${orders}`
      }
      if (obj.offset && obj.limit) {
        query = query + ` LIMIT ${obj.offset},${obj.limit}`
      }
      if (table) {
        console.log(chalk.blue(query));
        return await this.mysql.query(query)
      } else {
        return null
      }
    }
  },
};