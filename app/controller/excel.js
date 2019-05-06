'use strict';

const Controller = require('egg').Controller;
const nodeExcel = require('excel-export');
const format = require('date-fns/format');

class ExcelController extends Controller {

  async user() {
    const ctx = this.ctx;
    let conf = {};
    const toArray = value => {
      let result = new Array();
      for (let i = 0; i < value.length; i++) {
        let arr = new Array();
        arr.push(value[i].user_id);
        arr.push(value[i].employee_id);
        arr.push(value[i].real_name);
        arr.push(value[i].sex);
        arr.push(value[i].pay);
        arr.push(value[i].phone);
        arr.push(value[i].email);
        arr.push(value[i].role);
        arr.push(format(value[i].birth_time, 'YYYY-MM-DD HH:mm:ss'));
        arr.push(format(value[i].join_time, 'YYYY-MM-DD HH:mm:ss'));
        arr.push(value[i].station);
        arr.push(value[i].status);
        arr.push(value[i].remark);
        arr.push(value[i].bank_address);
        arr.push(value[i].bank_card);
        arr.push(value[i].native_address);
        arr.push(value[i].native_address_detail);
        arr.push(value[i].nation);
        arr.push(value[i].marriage);
        arr.push(value[i].soft_delete);
        arr.push(format(value[i].update_time, 'YYYY-MM-DD HH:mm:ss'));
        arr.push(format(value[i].create_time, 'YYYY-MM-DD HH:mm:ss'));
        result.push(arr);
      }
      return result;
    };
    conf.name = "Sheet1";
    conf.cols = [{
      caption: '用户ID',
      type: 'string'
    }, {
      caption: '工号',
      type: 'string'
    }, {
      caption: '真实姓名',
      type: 'string'
    }, {
      caption: '性别',
      type: 'number'
    }, {
      caption: '收入',
      type: 'string'
    }, {
      caption: '手机号',
      type: 'string'
    }, {
      caption: 'E-mail',
      type: 'string'
    }, {
      caption: '角色',
      type: 'string'
    }, {
      caption: '出生日期',
      type: 'string'
    }, {
      caption: '入职日期',
      type: 'string'
    }, {
      caption: '岗位',
      type: 'number'
    }, {
      caption: '备注',
      type: 'string',
    }, {
      caption: '银行卡开户地址',
      type: 'string',
    }, {
      caption: '银行卡号',
      type: 'string',
    }, {
      caption: '籍贯地址',
      type: 'string',
    }, {
      caption: '籍贯详细地址',
      type: 'string',
    }, {
      caption: '民族',
      type: 'string',
    }, {
      caption: '婚姻情况',
      type: 'number',
    }, {
      caption: '是否已删除',
      type: 'number',
    }, {
      caption: '更新时间',
      type: 'string',
    }, {
      caption: '创建时间',
      type: 'string',
    }];
    const rows = await ctx.service.excel.user();
    conf.rows = toArray(rows);
    let result = nodeExcel.execute(conf);
    let data = new Buffer(result, 'binary');
    ctx.set('Content-Type', 'application/vnd.openxmlformats');
    const name = new Date().toLocaleDateString().replace(/\//g, '');
    ctx.set("Content-Disposition", "attachment; filename=" + name + ".xlsx");
    ctx.body = data;
  }

}

module.exports = ExcelController;