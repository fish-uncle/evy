'use strict';

module.exports = {
  get sql() {
    const select = async (table, obj = {}) => {
      let columns = '', orders = '', where = '', like = {};

      // columns
      // 数据判断
      if (obj.columns instanceof Array && obj.columns.length > 0) {
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

      const judgeObj = function (obj) {
        for (let item in obj) {
          return true;
        }
        return false;
      };
      for (let i in  like) {
        like[i].type === 'like' ? where += `${i} LIKE \'%${like[i].value}%\' AND ` : where += `${i} = ${format(like[i].value)} AND `
      }
      where = `${where.replace(/^(.*)AND /, '$1')}`;

      // where
      // 空对象判断
      if (judgeObj(obj.like) || judgeObj(obj.where)) {
        query = query + ` WHERE ${where}`
      }

      // orders
      // 数组判断
      if (obj.orders instanceof Array && obj.orders.length > 0) {
        for (let i = 0; i < obj.orders.length; i++) {
          if (i === obj.orders.length - 1) {
            obj.orders[i] instanceof Array ? orders += obj.orders[i][0] + ' ' + obj.orders[i][1] : void 0
          } else {
            obj.orders[i] instanceof Array ? orders += obj.orders[i][0] + ' ' + obj.orders[i][1] + ',' : void 0
          }
        }
        query = query + ` ORDER BY ${orders}`
      }

      // offset limit
      // 数字判断
      if (typeof obj.offset === 'number' && typeof obj.limit === 'number') {
        query = query + ` LIMIT ${obj.offset},${obj.limit}`
      }
      this.getLogger('sqlLogger').info(query);
      return await this.mysql.query(query)
    };
    return {select}
  },
};