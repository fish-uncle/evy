import React, {Component} from 'react';
import {connect} from 'dva';
import {DrawerActions, RouterActions, SheetActions} from '../../models';
import {Body, Modal, Sheet} from '../../components';
import columns from './columns';
import Detail from './detail';

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions,...DrawerActions})
export default class IndexPage extends Component {

  buttonHandle = () => {
    // const defaultUser = {
    //   sex: 1,
    //   nation: '汉族',
    //   marriage: 0,
    //   status: 1,
    // };
    this.props.sheet_button_event({
      type: 'insert', // 自定义按钮 insert 事件
      callback: _ => {
        this.props.drawer_detail_show();
      }
    });
    this.props.sheet_button_event({
      type: 'detail', // 自定义按钮 detail 事件
      callback: (record) => {
        this.props.drawer_detail_show({data: record});
      }
    });
  };

  componentWillMount() {
    this.props.sheet_columns({columns: columns}); // 初始化 table 列表
    this.buttonHandle();
  }

  componentDidMount() {
    this.props.sheet_page({current: 1});
    this.props.sheet_button(); // 按钮权限获取
  }

  render() {
    return (
      <Body>
      <Sheet rowKey='user_id'/>
      <Modal>
        <p>Bla bla ...</p>
      </Modal>
      <Detail/>
      </Body>
    );
  }
}