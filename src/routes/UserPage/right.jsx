import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {SheetActions} from '../../models';
import {FormItem} from '../../components';
import {Form, Button, notification} from 'antd';
import {sex, station, nation, marriage} from '../../utils/select';
import {GET, POST, PUT, DELETE, HEAD, OPTIONS, PATCH} from '../../utils/request';

@connect((sheet) => ({...sheet}), {...SheetActions})
class Right extends Component {

  componentWillMount() {
    const form = this.props.form;
    this.props.drawer_set({form}); // 传递 antd 的 form 给 model
  }

  setAdminHandle = (detailData) => {
    try {
      POST('/api/user/setAdmin', detailData);
      this.props.sheet_load();
      this.props.drawer_close();
      notification.success({message: '提示', description: '设置成功'});
    } catch (e) {
      notification.success({message: '提示', description: '设置失败'});
    }
  };

  cancelAdminHandle = (detailData) => {
    try {
      POST('/api/user/cancelAdmin', detailData);
      this.props.sheet_load();
      this.props.drawer_close();
      notification.success({message: '提示', description: '取消成功'});
    } catch (e) {
      notification.success({message: '提示', description: '取消失败'});
    }
  };

  render() {
    const {sheet} = this.props;
    const {drawerType, search, detailData} = sheet;
    return (
      <Fragment>
        {
          drawerType === 'insert' || drawerType === 'detail' ? <Fragment>
            <FormItem label="头像" title='avatar' type='img' action='/' size='200*200' name='img'/>
            <FormItem label="姓名" title='real_name'/>
            <FormItem label="岗位" title='station' type='select' select={station}
                      defaultValue={'0'}/>
            <FormItem label="权限角色" title='role'/>
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
            <FormItem label="开户行地址" title='native_address' type='input' required={false}/>
            <FormItem label="籍贯详细地址" title='bank_address' type='textarea' required={false}/>
            <FormItem label="备注" title='remark' type='textarea' required={false}/>
            <FormItem label="更新时间" title='update_time' type='date' disabled={true}/>
            <FormItem label="创建时间" title='create_time' type='date' disabled={true}/>
            <FormItem title='user_id' type='hidden' required={false}/>
            {
              detailData.type == 0 ? <Button block onClick={() => this.setAdminHandle(detailData)}>设为管理员</Button> :
                <Button block onClick={() => this.cancelAdminHandle(detailData)}>取消管理员</Button>
            }

          </Fragment> : null
        }
        {
          drawerType === 'search' ? <Fragment>
            <FormItem label="姓名" title='real_name' required={false} defaultValue={search.real_name}/>
            <FormItem label="工号" title='employee_id' required={false} defaultValue={search.employee_id}/>
            <FormItem label="手机号" title='phone' required={false} defaultValue={search.phone}/>
            <FormItem label="性别" title='sex' type='select' select={sex} required={false}
                      defaultValue={search.sex}/>
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