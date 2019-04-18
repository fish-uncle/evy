import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body, Sheet, Drawer} from '../../components';
import columns from './columns';
import moment from 'moment';
import Right from './right';

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
export default class UserPage extends Component {

  componentWillMount() {
    this.props.sheet_set({
      columns: columns, rowKey: 'id', loadCallback: data => {
        data.list.map(item => {
          item['field_rangeDate'] = [moment(item.field_rangeDate[0], 'YYYY-MM-DD'), moment(item.field_rangeDate[1], 'YYYY-MM-DD')];
        })
      }
    }); // 初始化 table 列表
    this.props.sheet_url({
      listUrl: '/api/example',
      insertUrl: '/api/example/insert',
      deleteUrl: '/api/example/delete',
      updateUrl: '/api/example/update',
    })
  }

  componentDidMount() {
  }

  render() {
    return (
      <Body>
      <Sheet/>
      <Drawer>
        <Right/>
      </Drawer>
      </Body>
    );
  }
}