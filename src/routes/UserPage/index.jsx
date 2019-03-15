import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {RouterActions, SheetActions} from '../../models';
import {Body,Sheet} from '../../components';

const columns = [{
  title: '姓名',
  key: 'real_name',
  searchType: 'input',
}, {
  title: '手机号',
  key: 'phone',
  searchType: 'input',
}, {
  title: '职称',
  key: 'job_name',
  searchType: 'input',
}, {
  title: '性别',
  key: 'sex',
  searchType: 'select',
  searchArray: [[1, '男'], [0, '女'], [2, '未知']]
}, {
  title: '状态',
  key: 'status',
  searchType: 'select',
  searchArray: [[1, '可用'], [0, '不可用']]
}];
@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class IndexPage extends Component {

  componentDidMount() {
    this.props.sheet_page({current: 1});
    this.props.sheet_button();
  }

  componentWillUnmount() {

  }

  render() {


    return (
      <Body>
      <Sheet rowKey='user_id' columns={columns}/>
      </Body>
    );
  }
}