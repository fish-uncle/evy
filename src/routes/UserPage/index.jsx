import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Detail from './detail';
import Search from './search';

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class UserPage extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'user_id'}); // 初始化 table 列表
    this.props.sheet_url({listUrl: '/api/user'})
  }

  componentDidMount() {
    this.props.sheet_page({current: 1});
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