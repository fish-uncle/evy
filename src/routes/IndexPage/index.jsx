import React, {Component} from 'react';
import {connect} from 'dva';
import {ModalActions, RouterActions, SheetActions} from '../../models';
import {Body, Modal, Sheet} from '../../components';

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
@connect((sheet, modal) => ({...sheet, ...modal}), {...RouterActions, ...SheetActions, ...ModalActions})
export default class IndexPage extends Component {


  insertHandle = () => {
    this.props.sheet_button_event({
      type: 'insert',
      callback: _ => {
        this.props.modal_show();
      }
    });
    this.props.sheet_button_event({
      type: 'detail',
      callback: (record) => {
        console.log(record)
      }
    });
  };

  componentWillMount() {
    this.insertHandle();
  }

  componentDidMount() {
    this.props.sheet_page({current: 1});
    this.props.sheet_button();
  }

  render() {
    return (
      <Body>
      <Sheet rowKey='user_id' columns={columns}/>
      <Modal>
        <p>Bla bla ...</p>
      </Modal>
      </Body>
    );
  }
}