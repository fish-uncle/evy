import React, {Component} from 'react';
import {Checkbox} from 'antd';
import {Login, Default} from '../../components';
import {connect} from "dva";
import './index.less';

const {Tab, UserName, Password, Submit} = Login;

@connect((config) => ({...config}), {})
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  handleSubmit = (err, values) => {
    // const { type } = this.state;
    // if (!err) {
    //   const { dispatch } = this.props;
    //   dispatch({
    //     type: 'login/login',
    //     payload: {
    //       ...values,
    //       type,
    //     },
    //   });
    // }
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
                onSubmit={this.handleSubmit}
                ref={form => {
                  this.loginForm = form;
                }}
              >
                <Tab key="account" tab='账户密码登录'>
                  <UserName
                    name="userName"
                    placeholder={`用户名`}
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
                      this.loginForm.validateFields(this.handleSubmit);
                    }}
                  />
                </Tab>
                <div>
                  <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                    自动登录
                  </Checkbox>
                  <a style={{float: 'right'}} href="">
                    忘记密码
                  </a>
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
