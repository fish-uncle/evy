import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Form} from 'antd';
import {boolean} from "../../utils/select";

@connect((sheet) => ({...sheet}), {...SheetActions})
class Right extends Component {

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model
  }

  render() {
    const {sheet, nexusList} = this.props;
    const {drawerType} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'insert' || drawerType === 'detail' ? <Fragment>
            <FormItem label="菜单名" title='title'/>
            <FormItem label="链接类型" title='type' type='select' select={{'内部地址': 1, '外部地址': 2}}
                      defaultValue={1}/>
            <FormItem label="链接地址" title='url' required={false}/>
            <FormItem label="排序" title='sort' required={false}/>
            <FormItem label="是否显示在左侧菜单" title='display' type='select' select={boolean} defaultValue={0}/>
            <FormItem label="所属父级菜单" title='nexus' required={false} type='select' select={nexusList}
                      defaultValue={null}/>
            <FormItem label="图标" title='icon' required={false}/>
            <FormItem title='menu_id' type='hidden' required={false}/>
          </Fragment> : null
        }
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