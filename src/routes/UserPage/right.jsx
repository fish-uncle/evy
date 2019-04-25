import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Form, Button, notification} from 'antd';
import {sex, station, nation, marriage, status} from '../../utils/select';
import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../../utils/request';
import cityList from '../../utils/cityList';

@connect((sheet) => ({...sheet}), {...SheetActions})
class Right extends Component {

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model
  }

  passwordHandle = (detailData) => {
    try {
      POST('/api/user/password', detailData);
      this.props.sheet_load();
      this.props.drawer_close();
      notification.success({message: '提示', description: '重置成功'});
    } catch (e) {
      notification.success({message: '提示', description: '重置失败'});
    }
  };

  render() {
    const {sheet, roleList} = this.props;
    const {drawerType, detailData} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'insert' || drawerType === 'detail' ? <Fragment>
            <FormItem label="头像" title='avatar' type='img' action='/' size='200*200' name='img' required={false}/>
            <FormItem label="姓名" title='real_name'/>
            <FormItem label="岗位" title='station' type='select' select={station}
                      defaultValue={'0'}/>
            <FormItem label="权限角色" title='role' type='select' select={roleList}/>
            <FormItem label="状态" title='status' type='select' select={status}/>
            <FormItem label="薪酬" title='pay' defaultValue={0}/>
            <FormItem label="工号" title='employee_id'/>
            <FormItem label="手机号" title='phone'/>
            <FormItem label="E-mail" title='email' required={false}/>
            <FormItem label="性别" title='sex' type='select' select={sex}
                      defaultValue={'1'}/>
            <FormItem label="民族" title='nation' type='select' select={nation}
                      defaultValue='汉族'/>
            <FormItem label="婚姻情况" title='marriage' type='select'
                      select={marriage}
                      defaultValue={'1'}/>
            <FormItem label="出生日期" title='birth_time' type='date'/>
            <FormItem label="入职时间" title='join_time' type='date'/>
            <FormItem label="银行卡号" title='bank_card' type='input' required={false}/>
            <FormItem label="开户行地址" title='bank_address' type='input' required={false}/>
            <FormItem label="籍贯" title='native_address' type='cascader' required={false} options={cityList}/>
            <FormItem label="籍贯详细地址" title='native_address_detail' type='textarea' required={false}/>
            <FormItem label="备注" title='remark' type='textarea' required={false}/>
            <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
            <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
            <FormItem title='user_id' type='hidden' required={false}/>
            <Button block onClick={() => this.passwordHandle(detailData)}>重置密码：888888</Button>
          </Fragment> : null
        }
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="姓名" title='real_name' required={false}/>
            <FormItem label="工号" title='employee_id' required={false}/>
            <FormItem label="手机号" title='phone' required={false}/>
            <FormItem label="性别" title='sex' type='select' select={sex} required={false}/>
            <FormItem label="选择时间" title='update_time' type='rangeDate' required={false}/>
          </Fragment> : null
        }
      </Fragment>
    );
  }
}

const FormApp = Form.create()(Right);
export default FormApp;