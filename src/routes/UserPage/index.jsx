import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {RouterActions, SheetActions} from '../../models';
import {Body} from '../../components';
import Sheet from '../../components/sheet';

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
    const button = [{
      "type": "recovery",
      "style": "2",
      "title": "回收站",
      "url": "/userCenterRecovery"
    }, {
      "type": "insert",
      "style": "1",
      "title": "添加",
      "url": "/userCenterInsert"
    }, {
      "type": "read",
      "style": "1",
      "title": "列表数据",
      "url": "/api/user"
    }, {
      "type": "view",
      "style": "1",
      "title": "员工信息",
      "url": "/userCenter"
    }, {
      "type": "delete",
      "style": "2",
      "title": "删除",
      "url": "/pear/user/delete"
    }, {
      "type": "update",
      "style": "1",
      "title": "更新",
      "url": "/userCenterUpdate"
    }];
    this.props.sheet_button(button);
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