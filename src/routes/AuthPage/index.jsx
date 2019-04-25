import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Right from './right';
import moment from "moment";
import {GET} from "../../utils/request";

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class AuthPage extends Component {
  state = {
    menuList: {}
  };

  componentWillMount() {
    this.props.sheet_set({
      columns: columns, rowKey: 'auth_id', loadCallback: data => {
        data.list.map(item => {
          item['update_time'] = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
          item['create_time'] = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        })
      }
    }); // 初始化 table 列表
    this.props.sheet_url({
      listUrl: '/api/auth/list',
      insertUrl: '/api/auth/insert',
      deleteUrl: '/api/auth/delete',
      updateUrl: '/api/auth/update',
      recoveryUrl: '/auth/recovery'
    });
    GET('/api/menu/all').then(data => {
      let menuList = {};
      data.list.map(item => {
        menuList[item.title] = item['menu_id']
      });
      this.setState({menuList})
    })
  }

  componentDidMount() {
  }

  render() {
    const {menuList} = this.state;
    return (
      <Body>
      <Sheet hasExportBtn={false}/>
      <Drawer>
        <Right menuList={menuList}/>
      </Drawer>
      </Body>
    );
  }
}