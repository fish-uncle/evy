import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Right from './right';
import moment from "moment";

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class AppPage extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'app_id', loadCallback: data => {
        data.list.map(item => {
          item['update_time'] = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
          item['create_time'] = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        })
      }}); // 初始化 table 列表
    this.props.sheet_url({
      listUrl: '/api/application/list',
      insertUrl: '/api/application/insert',
      deleteUrl: '/api/application/delete',
      updateUrl: '/api/application/update',
      recoveryUrl: '/app/recovery'
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