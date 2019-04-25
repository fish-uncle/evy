import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Form} from 'antd';
import {sex} from '../../utils/select';

@connect((sheet) => ({...sheet}), {...SheetActions})
class Right extends Component {

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model
  }

  render() {
    const {sheet} = this.props;
    const {drawerType} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="姓名" title='real_name' required={false}/>
            <FormItem label="工号" title='employee_id' required={false}/>
            <FormItem label="手机号" title='phone' required={false}/>
            <FormItem label="性别" title='sex' type='select' select={sex} required={false}/>
            <FormItem label="选择时间" title='update_time' type='rangeDate' required={false}/>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Right);
export default FormApp;