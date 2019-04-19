import React, {Component, Fragment} from 'react';
import moment from "moment";
import {Button, Modal, notification} from "antd";
import mackColumns from '../../utils/mackColumns';
import {connect} from "dva";
import {SheetActions} from "../../models";
import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../../utils/request';
import {sex, toColumns, station} from '../../utils/select';

@connect((sheet) => ({...sheet}), {...SheetActions})
class Operation extends Component {
  recoverHandle = item => {
    const {sheet} = this.props;
    Modal.confirm({
      content: '确认是否恢复？',
      onOk: () => {
        try {
          POST(sheet.recoverUrl, item);
          this.props.sheet_load();
          notification.success({message: '提示', description: '恢复成功'});
        } catch (e) {
          notification.success({message: '提示', description: '恢复失败'});
        }
      }
    })
  };

  render() {
    const {item} = this.props;
    return (
      <Fragment>
        <Button onClick={e => {
          e.stopPropagation();
          this.recoverHandle(item)
        }}>恢复</Button>
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