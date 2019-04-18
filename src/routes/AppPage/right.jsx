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
    const {drawerType, search} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'insert' || drawerType === 'detail' ? <Fragment>
            <FormItem label="图标" title='icon' type='img' action='/' size='200*200' name='img' required={false}/>
            <FormItem label="中文标题" title='cn_title'/>
            <FormItem label="英文标题" title='en_title'/>
            <FormItem label="描述" title='description' type='textArea'/>
            <FormItem label="关联网址" title='associate_url' required={false}/>
            <FormItem label="版本号" title='version'/>
            <FormItem label="强制更新" title='update' type='switch' required={false}/>
            <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
            <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
            <FormItem title='app_id' type='hidden' required={false}/>
          </Fragment> : null
        }
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="中文标题" title='cn_title' required={false} defaultValue={search.cn_title}/>
            <FormItem label="英文标题" title='en_title' required={false} defaultValue={search.en_title}/>
            <FormItem label="描述" title='description' type='textArea' required={false}
                      defaultValue={search.description}/>
            <FormItem label="版本号" title='version' required={false} defaultValue={search.version}/>
            <FormItem label="强制更新" title='update' type='switch' required={false} defaultValue={search.update}/>
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