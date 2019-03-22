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
  title: '模块名',
  key: 'cn_title',
}, {
  title: '描述',
  key: 'description',
}, {
  title: '描述',
  key: 'release',
  render: item => item.release ? '已上架' : '未上架',
}, {
  title: '更新时间',
  width: 160,
  key: 'update_time',
  render: item => moment(item.update_time).format('YYYY-MM-DD HH:mm:ss'),
}, {
  title: '操作',
  width: 100,
  key: 'operation',
  render: (item) => <Operation item={item}/>,
}];
export default mackColumns(columns);