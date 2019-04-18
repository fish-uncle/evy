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