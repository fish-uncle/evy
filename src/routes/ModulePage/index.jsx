import React, {Component} from 'react';
import {connect} from 'dva';
import moment from "moment";
import {LeftActions, RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Right from './right';
import request from "../../utils/request";

@connect((sheet, left) => ({...sheet, ...left}), {...RouterActions, ...SheetActions, ...LeftActions})
export default class ModulePage extends Component {

  state = {
    appList: {}
  };

  componentWillMount() {
    this.props.sheet_set({
      columns: columns, rowKey: 'module_id', loadCallback: data => {
        data.list.map(item => {
          item['start_time'] = moment(item.start_time).format('YYYY-MM-DD HH:mm:ss');
          item['end_time'] = moment(item.end_time).format('YYYY-MM-DD HH:mm:ss');
          item['update_time'] = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
          item['create_time'] = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
        });
        return data
      }
    }); // 初始化 table 列表
    this.props.sheet_url({
      listUrl: '/api/module/list',
      insertUrl: '/api/module/insert',
      deleteUrl: '/api/module/delete',
      updateUrl: '/api/module/update',
      recoveryUrl: '/module/recovery'
    });
    let appList = {};
    request.get('/api/application/all').then(data => {
      data.list.map(item => {
        appList[item.cn_title] = item['app_id']
      });
      this.setState({appList})
    });
  }

  componentDidMount() {
  }

  render() {
    const {appList} = this.state;
    return (
      <Body>
      <Sheet hasExportBtn={false}/>
      <Drawer>
        <Right appList={appList}/>
      </Drawer>
      </Body>
    );
  }
}