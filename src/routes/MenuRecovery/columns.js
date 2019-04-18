import React, {Component, Fragment} from 'react';
import moment from "moment";
import {Button, Modal, notification} from "antd";
import mackColumns from '../../utils/mackColumns';
import {connect} from "dva";
import {SheetActions} from "../../models";
import {POST} from "../../utils/request";

@connect((sheet) => ({...sheet}), {...SheetActions})
class Operation extends Component {
  recoverHandle = item => {
    const {sheet} = this.props;
    Modal.confirm({
      content: '确认是否恢复？',
      onOk: () => {
        try {
          POST(sheet.recoverUrl, item).then(() => {
            this.props.sheet_load();
            notification.success({message: '提示', description: '恢复成功'});
          });
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
  title: '菜单名',
  key: 'title',
}, {
  title: '链接类型',
  key: 'type',
  render: item => item.type === 1 ? '内部地址' : '外部地址',
}, {
  title: '链接地址',
  key: 'url',
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