import React, {Component} from 'react';
import {connect} from 'dva';
import {LeftActions, RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Detail from './detail';
import Search from './search';

@connect((sheet, left) => ({...sheet, ...left}), {...RouterActions, ...SheetActions, ...LeftActions})
export default class ModulePage extends Component {

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'app_id'}); // 初始化 table 列表
    this.props.sheet_url({listUrl: '/api/module'})
  }

  componentDidMount() {
    this.props.sheet_page({current: 1});
    this.props.left_choose({title: '模块列表-xxx'});
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