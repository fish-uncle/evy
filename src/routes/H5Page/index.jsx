import React, {Component} from 'react';
import {connect} from 'dva';
import {LeftActions, RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Right from './right';

@connect((sheet, left) => ({...sheet, ...left}), {...RouterActions, ...SheetActions, ...LeftActions})
export default class H5Page extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'h5_id'}); // 初始化 table 列表
    this.props.sheet_url({
      listUrl: '/api/h5/list',
      recoveryUrl: '/h5/recovery',
      insertUrl: '/api/h5/insert',
      deleteUrl: '/api/h5/delete',
      updateUrl: '/api/h5/update'
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