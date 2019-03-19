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
  title: '标题名',
  key: 'cn_title',
}, {
  title: '描述',
  key: 'description',
}, {
  title: '版本',
  key: 'version',
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