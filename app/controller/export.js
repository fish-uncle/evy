'use strict';

const Controller = require('egg').Controller;
const nodeExcel = require('excel-export');

class ExportController extends Controller {

  async application() {
    const ctx = this.ctx;
    let conf = {};
    let v = [
      {name: "张三", age: "20", sex: "男", birthday: "1998-10-10"},
      {name: "李四", age: "21", sex: "男", birthday: "1997-08-08"},
      {name: "王五", age: "22", sex: "男", birthday: "1996-06-06"},
      {name: "赵六", age: "20", sex: "男", birthday: "1998-12-12"},
    ];
    conf.name = "sheet1";
    let alldata = new Array();
    for (let i = 0; i < v.length; i++) {
      let arr = new Array();
      arr.push(v[i].name);
      arr.push(v[i].age);
      arr.push(v[i].sex);
      arr.push(v[i].birthday);
      alldata.push(arr);
    }
    //决定列名和类型
    conf.cols = [{
      caption: '姓名',
      type: 'string'
    }, {
      caption: '年龄',
      type: 'number'
    }, {
      caption: '性别',
      type: 'string'
    }, {
      caption: '出生日期',
      type: 'string',
    }];
    conf.rows = alldata;
    let result = nodeExcel.execute(conf);
    let data = new Buffer(result, 'binary');
    ctx.set('Content-Type', 'application/vnd.openxmlformats');
    const name = new Date().toLocaleDateString().replace(/\//g, '');
    ctx.set("Content-Disposition", "attachment; filename=" + name + ".xlsx");
    ctx.body = data;
  }

}

module.exports = ExportController;