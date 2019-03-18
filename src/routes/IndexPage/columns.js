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
  searchType: 'input',
  key: 'real_name',
}, {
  title: '手机号',
  searchType: 'input',
  key: 'phone',
}, {
  title: '职称',
  searchType: 'input',
  key: 'job_name',
}, {
  title: '性别',
  searchType: 'select',
  searchArray: [[1, '男'], [2, '女']],
  key: 'sex',
}, {
  title: '状态',
  searchType: 'select',
  searchArray: [[1, '可用'], [2, '禁用']],
  key: 'status',
}, {
  title: '更新时间',
  width: 160,
  key: 'update_time',
  render: item => (moment(item.update_time).format('YYYY-MM-DD hh:mm:ss')),
}
, {
  title: '操作',
  width: 100,
  key: 'operation',
  render: (item) => <Button type="danger" onClick={e => {
    e.stopPropagation();
    deleteHandle(item)
  }}>删除</Button>,
}
];


export default mackColumns(columns);