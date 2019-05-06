import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Right from './right';
import moment from "moment";

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class RolePage extends Component {

  componentWillMount() {
    this.props.sheet_set({
      columns: columns, rowKey: 'role_id', loadCallback: data => {
        data.list.map(item => {
          item['update_time'] = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
          item['create_time'] = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        });
        return data;
      }
    }); // 初始化 table 列表
    this.props.sheet_url({
      listUrl: '/api/role/list',
      insertUrl: '/api/role/insert',
      deleteUrl: '/api/role/delete',
      updateUrl: '/api/role/update',
      recoveryUrl: '/role/recovery'
    })
  }

  componentDidMount() {
  }

  render() {
    return (
      <Body>
      <Sheet hasExportBtn={false}/>
      <Drawer>
        <Right/>
      </Drawer>
      </Body>
    );
  }
}