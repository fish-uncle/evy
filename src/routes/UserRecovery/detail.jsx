import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Button, Form, Upload, notification} from 'antd';
import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../../utils/request';

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
            {/*<div className='avatar-container'>
              <img src={detailData.avatar} alt=""/>
              <p>200*200</p>
              <Upload accept=".jpg,.png" action='' name='avatar' withCredentials={true}><Button
                type='primary'>更换</Button></Upload>
            </div>*/}
            <div className="fn-clear">
              <FormItem className='fn-fl' label="姓名" title='real_name'/>
              <FormItem className='fn-fr' label="角色" title='role' type='select' select={{'普通职工': '1', '经理': '2'}}
                        defaultValue={1}/>
            </div>
            <div className="fn-clear">
              <FormItem className='fn-fl' label="薪酬" title='pay' defaultValue={0}/>
              <FormItem className='fn-fr' label="工号" title='employee_id'/>
            </div>
            <div className="fn-clear">
              <FormItem className='fn-fl' label="手机号" title='phone'/>
              <FormItem className='fn-fr' label="E-mail" title='email' required={false}/>
            </div>
            <div className="fn-clear">
              <FormItem className='fn-fl' label="性别" title='sex' type='select' select={{'男': '1', '女': '2'}}
                        defaultValue={1}/>
              <FormItem className='fn-fr' label="民族" title='nation' type='select' select={{'汉族': '汉族'}}
                        defaultValue='汉族'/>
            </div>
            <div className="fn-clear">
              <FormItem className='fn-fl' label="婚姻情况" title='marriage' type='select'
                        select={{'未婚': '1', '已婚': '2', '离异': '3'}}
                        defaultValue={1}/>
              <FormItem className='fn-fr' label="出生日期" title='birth_time' type='date'/>
            </div>
            <div className="fn-clear">
              <FormItem className='fn-fl' label="入职时间" title='join_time' type='date'/>
              <FormItem className='fn-fr' label="银行卡号" title='bank_card' type='input' required={false}/>
            </div>
            <FormItem label="开户行地址" title='native_address' type='input' required={false}/>
            <FormItem label="籍贯详细地址" title='bank_address' type='textarea' required={false}/>
            <FormItem label="备注" title='remark' type='textarea' required={false}/>
            <div className="fn-clear">
              <FormItem className='fn-fl' label="更新时间" title='update_time' type='date' disabled={true}/>
              <FormItem className='fn-fr' label="创建时间" title='create_time' type='date' disabled={true}/>
            </div>
            <FormItem title='user_id' type='hidden' required={false}/>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Detail);
export default FormApp;