import React, {Component, Fragment} from 'react';
import moment from "moment";
import {Button, Modal} from "antd";
import mackColumns from '../../utils/mackColumns';
import {connect} from "dva";
import {SheetActions} from "../../models";

@connect((sheet) => ({...sheet}), {...SheetActions})
class Operation extends Component {
  deleteHandle = item => {
    Modal.confirm({
      content: '确认是否删除？',
      onOk: () => {
        console.log(item)
      }
    })
  };

  render() {
    const {item} = this.props;
    return (
      <Fragment>
        <Button type="danger" onClick={e => {
          e.stopPropagation();
          this.deleteHandle(item)
        }}>删除</Button>
      </Fragment>
    )
  }
}

const columns = [{
  role: '姓名',
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
  render: item => moment(item.update_time).format('YYYY-MM-DD hh:mm:ss'),
}, {
  title: '操作',
  width: 100,
  key: 'operation',
  render: (item) => <Operation item={item}/>,
}];
export default mackColumns(columns);