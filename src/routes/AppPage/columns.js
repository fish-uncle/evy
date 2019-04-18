import React, {Component, Fragment} from 'react';
import moment from "moment";
import {Button, Modal, notification} from "antd";
import mackColumns from '../../utils/mackColumns';
import {connect} from "dva";
import {RouterActions, SheetActions} from "../../models";
import {POST} from "../../utils/request";

@connect((sheet, left) => ({...sheet, ...left}), {...RouterActions, ...SheetActions})
class Operation extends Component {
  deleteHandle = item => {
    const {sheet} = this.props;
    Modal.confirm({
      content: '确认是否删除？',
      onOk: () => {
        try {
          POST(sheet.deleteUrl, item).then(() => {
            this.props.sheet_load();
            notification.success({message: '提示', description: '删除成功'});
          });
        } catch (e) {
          notification.success({message: '提示', description: '删除失败'});
        }
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
  title: '应用名',
  key: 'cn_title',
}, {
  title: '描述',
  key: 'description',
}, {
  title: '版本号',
  key: 'version',
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