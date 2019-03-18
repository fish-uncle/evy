import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {DrawerActions} from '../../models';
import {Drawer, FormItem} from '../../components';
import {Form} from 'antd';

@connect((drawer) => ({...drawer}), {...DrawerActions})
class Detail extends Component {

  componentDidMount() {
    const {getFieldDecorator} = this.props.form;
    this.props.drawer_set({getFieldDecorator}); // 传递 antd 的 form 给 model
  }

  render() {
    const {drawer} = this.props;
    const {data} = drawer;
    return (
      <Drawer>
        {
          data ? <Fragment>
            <FormItem label="职称" title='avatar'/>
            <FormItem label="姓名" title='real_name'/>
            <FormItem label="职称" title='job_name'/>
            <FormItem label="工号" title='employee_id'/>
            <FormItem label="手机号" title='phone'/>
            <FormItem label="E-mail" title='email'/>
            <FormItem label="性别" title='sex' type='select' select={{'男': 1, '女': 2}} defaultValue={1}/>
            <FormItem label="民族" title='nation' type='select' select={{'汉族': '汉族'}} defaultValue='汉族'/>
            <FormItem label="婚姻情况" title='marriage' type='select' select={{'未婚': 1, '已婚': 2, '离异': 3}}
                      defaultValue={0}/>
            <FormItem label="出生日期" title='birth_time' type='date'/>
            <FormItem label="状态" title='status' type='select' select={{'可用': 1, '禁用': 2}} defaultValue={1}/>
            <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
            <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
            <FormItem title='user_id' type='hidden'/>
          </Fragment> : null
        }
      </Drawer>
    );
  }
}

const FormApp = Form.create()(Detail);
export default FormApp;