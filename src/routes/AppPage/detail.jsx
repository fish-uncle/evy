import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Button, Form, Upload} from 'antd';

@connect((sheet) => ({...sheet}), {...SheetActions})
class Detail extends Component {

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model
  }

  render() {
    const {sheet} = this.props;
    const {drawerType, detailData} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'insert' || drawerType === 'detail' ? <Fragment>
            <div className='avatar-container'>
              <img src={detailData.icon} alt=""/>
              <p>200*200</p>
              <Upload accept=".jpg,.png" action='' name='icon' withCredentials={true}><Button type='primary'>更换</Button></Upload>
            </div>
            <FormItem label="中文标题" title='cn_title'/>
            <FormItem label="英文标题" title='en_title' disabeld={true}/>
            <FormItem label="描述" title='description' type='textArea'/>
            <FormItem label="关联网址" title='associate_url'/>
            <FormItem label="版本" title='version'/>
            <FormItem label="强制更新" title='update' type='switch'/>
            <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
            <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
            <FormItem title='app_id' type='hidden'/>
            <div className='pos-a btn-container'>
              {
                drawerType === 'insert' ?
                  <Button type='primary' block>新增</Button> :
                  <Button type='primary' block>更新</Button>
              }
            </div>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Detail);
export default FormApp;