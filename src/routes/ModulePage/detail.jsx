import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {FormItem} from '../../components';
import {Button, Form} from 'antd';
import {SheetActions} from "../../models";

@connect((sheet) => ({...sheet}), {...SheetActions})
class Detail extends Component {

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
              <FormItem label="中文标题" title='cn_title'/>
              <FormItem label="英文标题" title='en_title' disabeld={true}/>
              <FormItem label="描述" title='description' type='textArea'/>
              <FormItem label="标签" title='label' type='multiple' select={{'精品': 1, '置顶': 2}} required={false}/>
              <FormItem label="是否为定时模块" title='timing' type='switch' required={false}/>
              <FormItem label="模块开始时间" title='start_time' type='date' required={false}/>
              <FormItem label="模块结束时间" title='end_time' type='date' required={false}/>
              <FormItem label="是否上架" title='release' type='switch'/>
              <FormItem label="详细内容" title='content' type='editor' required={false}/>
              <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
              <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
              <FormItem title='module_id' type='hidden'/>
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