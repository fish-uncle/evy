import React, {Component, Fragment} from 'react';
import moment from "moment";
import {Button, Modal, notification} from "antd";
import mackColumns from '../../utils/mackColumns';
import {connect} from "dva";
import {SheetActions} from "../../models";
import request from '../../utils/request';
import {sex, toColumns, station, status} from '../../utils/select';

@connect((sheet) => ({...sheet}), {...SheetActions})
class Operation extends Component {
  deleteHandle = item => {
    const {sheet} = this.props;
    Modal.confirm({
      content: '确认是否删除？',
      onOk: async () => {
        await request.post(sheet.deleteUrl, item);
        this.props.sheet_load();
        notification.success({message: '提示', description: '删除成功'});
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
  title: '工号',
  key: 'employee_id',
}, {
  title: '姓名',
  key: 'real_name',
}, {
  title: '手机号',
  key: 'phone',
}, {
  title: 'E-mail',
  key: 'email',
}, {
  title: '角色',
  key: 'station',
  render: item => toColumns(item.station, station),
}, {
  title: '状态',
  key: 'status',
  render: item => toColumns(item.status, status),
}, {
  title: '性别',
  key: 'sex',
  render: item => toColumns(item.sex, sex),
}, {
  title: '更新时间',
  width: 200,
  key: 'update_time',
  render: item => moment(item.update_time).format('YYYY-MM-DD HH:mm:ss'),
}, {
  title: '操作',
  width: 100,
  key: 'operation',
  render: (item) => <Operation item={item}/>,
}];
export default mackColumns(columns);