import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Right from './right';
import moment from "moment";
import {GET} from "../../utils/request";

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class UserPage extends Component {

  state = {
    roleList: {}
  };

  componentWillMount() {
    this.props.sheet_set({
      columns: columns, rowKey: 'user_id', loadCallback: data => {
        data.list.map(item => {
          item['native_address'] = item.native_address ? item.native_address.split(',') : [];
          item['update_time'] = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
          item['create_time'] = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        });
        return data;
      }
    }); // 初始化 table 列表
    this.props.sheet_url({
      listUrl: '/api/user/list',
      insertUrl: '/api/user/insert',
      deleteUrl: '/api/user/delete',
      updateUrl: '/api/user/update',
      recoveryUrl: '/user/recovery',
      exportUrl: '/api/excel/user'
    });
    let roleList = {};
    GET('/api/role/all').then(data => {
      data.list.map(item => {
        roleList[item.title] = item['role_id']
      });
      this.setState({roleList})
    });
  }

  componentDidMount() {
  }

  render() {
    const {roleList} = this.state;
    return (
      <Body>
      <Sheet/>
      <Drawer>
        <Right roleList={roleList}/>
      </Drawer>
      </Body>
    );
  }
}