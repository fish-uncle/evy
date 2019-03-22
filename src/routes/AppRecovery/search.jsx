import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Button, Form} from 'antd';

@connect((sheet) => ({...sheet}), {...SheetActions})
class Search extends Component {

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model
  }


  render() {
    const {sheet} = this.props;
    const {drawerType} = sheet;
    return (
      <div>
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="中文标题" title='cn_title' required={false}/>
            <FormItem label="英文标题" title='en_title' required={false}/>
            <FormItem label="描述" title='description' type='textArea' required={false}/>
            <FormItem label="版本" title='version' required={false}/>
            <FormItem label="强制更新" title='update' type='switch' required={false}/>
            <FormItem label="选择时间" title='update_time' type='rangeDate' required={false}/>
            <div className='pos-a btn-container btn-2'>
              <Button block>清空</Button>
              <Button type='primary' block>搜索</Button>
            </div>
          </Fragment> : null
        }
      </div>
    );
  }
}

const FormApp = Form.create()(Search);
export default FormApp;