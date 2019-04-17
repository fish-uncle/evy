import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet} from '../../components';
import columns from './columns';

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class RolePage extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'menu_id'}); // 初始化 table 列表
    this.props.sheet_url({listUrl: '/api/menu/list'})
  }

  componentDidMount() {
  }

  render() {
    return (
      <Body>
      <Sheet hasAddBtn={false} hasRecoveryBtn={false} hasExportBtn={false} click={false}/>
      </Body>
    );
  }
}