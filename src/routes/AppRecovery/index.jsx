import React, {Component} from 'react';
import {connect} from 'dva';
import {LeftActions, RouterActions, SheetActions} from '../../models';
import {Body, Drawer, Sheet} from '../../components';
import columns from './columns';
import Right from "../AppPage/right";

@connect((sheet, left) => ({...sheet, ...left}), {...RouterActions, ...SheetActions, ...LeftActions})
export default class AppRecovery extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'app_id'}); // 初始化 table 列表
    this.props.sheet_url({listUrl: '/api/application/recovery', recoverUrl: '/api/application/recover'})
  }

  componentDidMount() {

  }

  render() {
    return (
      <Body>
      <Sheet hasAddBtn={false} hasRecoveryBtn={false} hasExportBtn={false} click={false}/>
      <Drawer>
        <Right/>
      </Drawer>
      </Body>
    );
  }
}