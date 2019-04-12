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
    const {drawerType, detailData, search} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'insert' || drawerType === 'detail' ? <Fragment>
            <div className='avatar-container'>
              <img src={detailData.avatar} alt=""/>
              <p>200*200</p>
              {/*  <Upload data={{user_id: detailData.user_id}}
                      accept=".jpg,.png"
                      name='avatar'
                      action='/api/user/avatar'
                      showUploadList={false}
                      withCredentials={true}><Button
                type='primary'>更换</Button></Upload>*/}
            </div>
            <div className="fn-clear">
              <FormItem className='fn-fl' label="姓名" title='real_name'/>
              <FormItem className='fn-fr' label="角色" title='role' type='select' select={{'普通职工': '1', '经理': '2'}}
                        defaultValue={'1'}/>
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
                        defaultValue={'1'}/>
              <FormItem className='fn-fr' label="民族" title='nation' type='select' select={{'汉族': '汉族'}}
                        defaultValue='汉族'/>
            </div>
            <div className="fn-clear">
              <FormItem className='fn-fl' label="婚姻情况" title='marriage' type='select'
                        select={{'未婚': '1', '已婚': '2', '离异': '3'}}
                        defaultValue={'1'}/>
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
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="姓名" title='real_name' required={false} defaultValue={search.real_name}/>
            <FormItem label="角色" title='role' required={false} type='select' select={{'普通职工': 1, '经理': 2}} defaultValue={search.role}/>
            <FormItem label="工号" title='employee_id' required={false} defaultValue={search.employee_id}/>
            <FormItem label="手机号" title='phone' required={false} defaultValue={search.phone}/>
            <FormItem label="性别" title='sex' type='select' select={{'男': 1, '女': 2}} required={false} defaultValue={search.sex}/>
            <FormItem label="选择时间" title='update_time' type='rangeDate' required={false} defaultValue={search.update_time}/>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Right);
export default FormApp;