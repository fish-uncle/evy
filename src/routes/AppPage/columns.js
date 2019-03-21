import React, {Component, Fragment} from 'react';
import moment from "moment";
import {Button, Modal} from "antd";
import mackColumns from '../../utils/mackColumns';
import {connect} from "dva";
import {RouterActions, SheetActions} from "../../models";

@connect((sheet, left) => ({...sheet, ...left}), {...RouterActions, ...SheetActions})
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
        <Button className='mr-10' onClick={e => {
          e.stopPropagation();
          this.props.push(`/module/${item.app_id}`)
        }}>模块列表</Button>
        <Button type="danger" onClick={e => {
          e.stopPropagation();
          this.deleteHandle(item)
        }}>删除</Button>
      </Fragment>
    )
  }
}

const columns = [{
  title: '应用名',
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
  render: item => moment(item.update_time).format('YYYY-MM-DD hh:mm:ss'),
}, {
  title: '操作',
  width: 200,
  key: 'operation',
  render: (item) => <Operation item={item}/>,
}];
export default mackColumns(columns);