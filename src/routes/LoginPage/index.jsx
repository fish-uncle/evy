import React, {Component} from 'react';
import {Checkbox, notification} from 'antd';
import {RouterActions} from '../../models';
import {Login, Default} from '../../components';
import {connect} from "dva";
import {Link} from "dva/router";
import './index.less';
import {POST} from "../../utils/request";

const {Tab, UserName, Password, Submit} = Login;

@connect((config) => ({...config}), {...RouterActions})
class LoginPage extends Component {
  state = {
    type: 'login',
    autoLogin: true,
  };

  loginSubmit = (err, values) => {
    const {userName, password} = values;
    let data = {};
    /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(userName) ? data.email = userName : data.phone = userName;
    data.password = password;
    POST('/api/login', data).then(data => {
      if (data && data.success) {
        notification.success({message: '提示', description: '登录成功'});
      }
    })
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  render() {
    const {config} = this.props;
    const {logo} = config;
    const {type, autoLogin} = this.state;
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
                <Tab key="login" tab='登录'>
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
                  <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                    自动登录
                  </Checkbox>
                  <Link className='fn-fr' to="/forget">
                    忘记密码?
                  </Link>
                </div>
                <Submit className='login-btn'>
                  登录
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
