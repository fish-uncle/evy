import React, {Component} from 'react';
import {connect} from 'dva';
import {LeftActions, RouterActions, SheetActions} from '../../models';
import {Body, Sheet} from '../../components';
import columns from './columns';

@connect((sheet, left) => ({...sheet, ...left}), {...RouterActions, ...SheetActions, ...LeftActions})
export default class ModulePage extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'h5_id'}); // 初始化 table 列表
    this.props.sheet_url({listUrl: '/api/h5'})
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