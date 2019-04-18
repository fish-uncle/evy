import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Form, Button, notification} from 'antd';
import {sex, station, nation, marriage} from '../../utils/select';
import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../../utils/request';

@connect((sheet) => ({...sheet}), {...SheetActions})
class Right extends Component {

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model
  }

  render() {
    const {sheet} = this.props;
    const {drawerType, search} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="姓名" title='real_name' required={false} defaultValue={search.real_name}/>
            <FormItem label="工号" title='employee_id' required={false} defaultValue={search.employee_id}/>
            <FormItem label="手机号" title='phone' required={false} defaultValue={search.phone}/>
            <FormItem label="性别" title='sex' type='select' select={sex} required={false}
                      defaultValue={search.sex}/>
            <FormItem label="选择时间" title='update_time' type='rangeDate' required={false}
                      defaultValue={search.update_time}/>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Right);
export default FormApp;