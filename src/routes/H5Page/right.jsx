import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {FormItem} from '../../components';
import {Form} from 'antd';
import {SheetActions} from "../../models";
import {env} from '../../utils/select';

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
          drawerType === 'insert' || drawerType === 'detail' ?
            <Fragment>
              <FormItem label="名称" title='name'/>
              <FormItem label="网页标题" title='title'/>
              <FormItem label="版本号" title='version'/>
              <FormItem label="是否上架" title='release' type='switch'/>
              <FormItem label="环境" title='env' type='select' select={env}/>
              <FormItem label="js" title='js_url' type='textarea'/>
              <FormItem label="css" title='css_url' type='textarea'/>
              <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
              <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
              <FormItem title='module_id' type='hidden'/>
            </Fragment> : null
        }
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="名称" title='name' required={false}/>
            <FormItem label="网页标题" title='title' required={false}/>
            <FormItem label="是否上架" title='release' type='switch' required={false}/>
            <FormItem label="选择时间" title='update_time' type='rangeDate' required={false}/>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Right);
export default FormApp;