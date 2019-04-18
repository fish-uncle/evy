import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Right from './right';

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class AppPage extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'app_id'}); // 初始化 table 列表
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