import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Button, Form} from 'antd';

@connect((sheet) => ({...sheet}), {...SheetActions})
class Detail extends Component {

  componentWillMount() {
    const {getFieldDecorator} = this.props.form;
    this.props.drawer_set({getFieldDecorator}); // 传递 antd 的 form 给 model
  }

  render() {
    const {sheet} = this.props;
    const {drawerType} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'insert' || drawerType === 'detail' ? <Fragment>
            <FormItem label="中文标题" title='cn_title'/>
            <FormItem label="英文标题" title='en_title' disabeld={true}/>
            <FormItem label="描述" title='description' type='textArea'/>
            <FormItem label="版本" title='version'/>
            <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
            <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
            <FormItem title='user_id' type='hidden'/>
            {
              drawerType === 'insert' ?
                <Button type='primary' block>新增</Button> :
                <Button type='primary' block>更新</Button>
            }
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Detail);
export default FormApp;