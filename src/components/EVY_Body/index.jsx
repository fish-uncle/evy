'use strict';
import React, {Component} from 'react';
import {Default, Left} from '..';
import {Layout, Icon, Breadcrumb, Dropdown, Menu} from 'antd';
import {LeftActions} from '../../models';
import './index.less';
import {connect} from 'dva';

const {Header, Content, Footer} = Layout;
const menu = (
  <Menu>
    <Menu.Item>
      <a href="/">退出登录</a>
    </Menu.Item>
  </Menu>
);
@connect((left, config) => ({...left, ...config}), {...LeftActions})
export default class Body extends Component {

  toggle = () => {
    this.props.left_toggle();
  };

  render() {
    const {left, children, config, style} = this.props;
    const {collapsed, breadcrumb} = left;
    return (
      <Default>
        <Layout className='body-container'>
          <Left/>
          <Layout>
            <Header className='body-header'>
              <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <Breadcrumb className='body-breadcrumb'>
                {
                  breadcrumb.map((item, index) => <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
                }
              </Breadcrumb>
              <Dropdown className='body-dropdown' overlay={menu}>
                <span>欢迎 , 操作员</span>
              </Dropdown>
            </Header>
            <Content className='body-content' style={style}>
              {children}
            </Content>
            <Footer className='body-footer text-center'>
              <a href='https://github.com/fish-uncle/evy' target='_blank' rel="nofollow"><Icon type='github'/></a>
              <span dangerouslySetInnerHTML={{__html: config.copyRight}}/>
              <span dangerouslySetInnerHTML={{__html: config.icp}}/>
            </Footer>
          </Layout>
        </Layout>
      </Default>
    )
  }
}