import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Drawer, Sheet} from '../../components';
import columns from './columns';
import Right from "../UserPage/right";

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class UserRecovery extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'user_id'}); // 初始化 table 列表
    this.props.sheet_url({
      listUrl: '/api/user/recovery',
      recoverUrl: '/api/user/recover'
    })
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