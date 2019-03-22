import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Detail from './detail';
import Search from './search';

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class AppPage extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'app_id'}); // 初始化 table 列表
    this.props.sheet_url({listUrl: '/api/app', exportUrl: '/api/export/app', recoveryUrl: '/app/recovery'})
  }

  componentDidMount() {
  }

  render() {
    return (
      <Body>
      <Sheet/>
      <Drawer>
        <Detail/>
        <Search/>
      </Drawer>
      </Body>
    );
  }
}