import React from 'react';
import moment from "moment";
import {Button, Modal} from "antd";
import mackColumns from '../../utils/mackColumns';

const deleteHandle = item => {
  Modal.confirm({
    content: '确认是否删除？',
    onOk: () => {
      console.log(item)
    }
  })
};
const columns = [{
  title: '姓名',
  key: 'real_name',
}, {
  title: '手机号',
  key: 'phone',
}, {
  title: '角色',
  key: 'role',
}, {
  title: '性别',
  key: 'sex',
  render: item => item.sex === 1 ? '男' : '女',
}, {
  title: '状态',
  key: 'status',
  render: item => item.status === 1 ? '可用' : '禁用',
}, {
  title: '更新时间',
  width: 160,
  key: 'update_time',
  render: item => (moment(item.update_time).format('YYYY-MM-DD hh:mm:ss')),
}, {
  title: '操作',
  width: 100,
  key: 'operation',
  render: (item) => <Button type="danger" onClick={e => {
    e.stopPropagation();
    deleteHandle(item)
  }}>删除</Button>,
}];


export default mackColumns(columns);