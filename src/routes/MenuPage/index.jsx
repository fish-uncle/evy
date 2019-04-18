import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import Right from './right';
import {GET} from "../../utils/request";

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class RolePage extends Component {
  state = {
    nexusList: {}
  };

  componentWillMount() {
    this.props.sheet_set({columns: columns, rowKey: 'menu_id'}); // 初始化 table 列表
    this.props.sheet_url({
      listUrl: '/api/menu/list',
      insertUrl: '/api/menu/insert',
      deleteUrl: '/api/menu/delete',
      updateUrl: '/api/menu/update',
      recoveryUrl: '/menu/recovery'
    });
    GET('/api/menu/all').then(data => {
      let nexusList = {'无父级': null};
      data.list.map(item => {
        nexusList[item.title] = item['menu_id']
      });
      this.setState({nexusList})
    })
  }

  componentDidMount() {
  }

  render() {
    const {nexusList} = this.state;
    return (
      <Body>
      <Sheet hasExportBtn={false}/>
      <Drawer>
        <Right nexusList={nexusList}/>
      </Drawer>
      </Body>
    );
  }
}