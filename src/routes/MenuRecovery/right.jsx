import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Form} from 'antd';

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
            <FormItem label="菜单名" title='title' required={false}/>
            <FormItem label="链接类型" title='type' type='select' select={{'内部地址': 1, '外部地址': 2}} required={false}/>
            <FormItem label="链接地址" title='url' required={false}/>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Right);
export default FormApp;