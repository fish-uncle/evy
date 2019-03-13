import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import './index.less';
import {RouterActions, SheetActions} from '../../models';
import {Body} from '../../components';
import Sheet from '../../components/sheet';

const columns = [{
  title: '员工姓名',
  key: 'user_real_name',
  searchType: 'input',
}, {
  title: '一级部门',
  key: 'department_title_1',
  searchType: 'input',
}, {
  title: '二级部门',
  key: 'department_title_2',
  searchType: 'input',
}, {
  title: '用户分组',
  key: 'group_title',
  searchType: 'input',
}, {
  title: '性别',
  key: 'user_sex',
  searchType: 'select',
  searchArray: [[1, '男'], [0, '女'], [2, '未知']]
}, {
  title: '状态',
  key: 'user_status',
  searchType: 'select',
  searchArray: [[1, '可用'], [0, '不可用']]
}];
@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class IndexPage extends Component {

  componentDidMount() {
    this.props.sheet_page({current: 1})
  }

  componentWillUnmount() {

  }

  render() {

    const button = [{
      "button_type": "recovery",
      "button_style": "2",
      "button_title": "回收站",
      "button_url": "/userCenterRecovery"
    },
      {
        "button_type": "insert",
        "button_style": "1",
        "button_title": "添加",
        "button_url": "/userCenterInsert"
      },
      {
        "button_type": "read",
        "button_style": "1",
        "button_title": "列表数据",
        "button_url": "/user.json"
      },
      {
        "button_type": "view",
        "button_style": "1",
        "button_title": "员工信息",
        "button_url": "/userCenter"
      },
      {
        "button_type": "delete",
        "button_style": "2",
        "button_title": "删除",
        "button_url": "/pear/user/delete"
      },
      {
        "button_type": "update",
        "button_style": "1",
        "button_title": "更新",
        "button_url": "/userCenterUpdate"
      }];
    return (
      <Body>
      <Sheet rowKey='user_id' button={button} columns={columns}/>
      </Body>
    );
  }
}