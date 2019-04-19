import React, {Component} from 'react';
import {connect} from 'dva';
import {RouterActions, SheetActions} from '../../models';
import {Body} from '../../components';
import {FormItem} from '../../components';
import {Form, Button} from 'antd';
import {GET} from "../../utils/request";
import './index.less';

@connect((sheet) => ({...sheet}), {...RouterActions, ...SheetActions})
class PowerPage extends Component {

  state = {
    roleList: {}
  };

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model

    GET('/api/role/all').then(data => {
      let roleList = {};
      data.list.map(item => {
        roleList[item.title] = item['role_id']
      });
      this.setState({roleList})
    })
  }

  selectHandle = () => {

  };

  componentDidMount() {

  }

  render() {
    const {roleList} = this.state;
    return (
      <Body>
      <div className="fn-clear power-role-select">
        <FormItem className='fn-fl' label='选择角色' type='select' select={roleList} title='role' placeholder='请选择'/>
        <Button className='fn-fl' type='primary' onClick={this.selectHandle}>选择</Button>
      </div>
      </Body>
    );
  }
}

const FormApp = Form.create()(PowerPage);
export default FormApp;