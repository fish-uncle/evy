import React, {Component} from 'react';
import {notification} from 'antd';
import {RouterActions} from '../../models';
import {Login, Default} from '../../components';
import {connect} from "dva";
import './index.less';
import request from "../../utils/request";
import {Link} from "react-router-dom";

const {Tab, UserName, Password, Submit} = Login;

@connect((config) => ({...config}), {...RouterActions})
class LoginPage extends Component {
  state = {
    type: 'forget',
  };

  loginSubmit = (err, values) => {
    const {userName, password} = values;
    let data = {};
    /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(userName) ? data.email = userName : data.phone = userName;
    data.password = password;
    request.post('/api/login', data).then(data => {
      if (data && data.success) {
        notification.success({message: '提示', description: '登录成功'});
      }
    })
  };

  render() {
    const {config} = this.props;
    const {logo} = config;
    const {type} = this.state;
    return (
      <Default>
        <div className='login-container'>
          <div>
            <div className='top'>
              <div className='header'>
                <a href="/" className='fn-block'>
                  <img src={logo.gray} className='logo'/>
                </a>
              </div>
              <div className='desc'>管理平台欢迎您</div>
            </div>
            <div className='main'>
              <Login
                defaultActiveKey={type}
                onSubmit={this.loginSubmit}
                ref={form => {
                  this.loginForm = form;
                }}
              >
                <Tab key="forget" tab='忘记密码'>
                  <UserName
                    name="userName"
                    placeholder={`手机号/邮箱`}
                    rules={[
                      {
                        required: true,
                        message: '用户名不能为空',
                      },
                    ]}
                  />
                  <Password
                    name="password"
                    placeholder={`密码`}
                    rules={[
                      {
                        required: true,
                        message: '密码不能为空',
                      },
                    ]}
                    onPressEnter={e => {
                      e.preventDefault();
                      this.loginForm.validateFields(this.loginSubmit);
                    }}
                  />
                </Tab>
                <div className='fn-clear'>
                  <Link className='fn-fr' to="/login">
                    去登录>
                  </Link>
                </div>
                <Submit className='login-btn'>
                  修改
                </Submit>
              </Login>
            </div>
          </div>
        </div>
      </Default>
    );
  }
}

export default LoginPage;
