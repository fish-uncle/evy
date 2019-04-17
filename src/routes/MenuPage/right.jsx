import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Button, Form} from 'antd';

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
            <FormItem label="菜单名" title='title'/>
            <FormItem label="链接类型" title='type' type='select' select={{'内部地址': 1, '外部地址': 2}}
                      defaultValue={1}/>
            <FormItem label="链接地址" title='url' required={false}/>
            <FormItem label="排序" title='sort' required={false}/>
            <FormItem label="图标" title='icon' required={false}/>
            <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
            <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
            <FormItem title='role_id' type='hidden'/>
          </Fragment> : null
        }
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="菜单名" title='title' required={false} defaultValue={search.title}/>
            <FormItem label="链接类型" title='type' type='select' select={{'内部地址': 1, '外部地址': 2}} required={false}
                      defaultValue={search.type}/>
            <FormItem label="链接地址" title='url' required={false} defaultValue={search.url}/>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Right);
export default FormApp;