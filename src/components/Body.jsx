'use strict';
import React, {Component} from 'react';
import {Default, Left} from '../components';
import {Layout, Icon, Breadcrumb} from 'antd';
import {LeftActions} from '../models';
import './Body.less';
import {connect} from 'dva';

const {Header, Content, Footer} = Layout;

@connect((left, config, search) => ({...left, ...config, ...search}), {...LeftActions})
export default class Body extends Component {

  toggle = () => {
    this.props.left_toggle();
  };

  render() {
    const {left, children, config} = this.props;
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
                  breadcrumb.map((item, index) => <Breadcrumb.Item key={index} >{item}</Breadcrumb.Item>)
                }
              </Breadcrumb>
            </Header>
            <Content className='body-content'>
              {children}
            </Content>
            <Footer className='body-footer text-center'>
              <a href='https://github.com/fish-uncle/DDM' target='_blank' rel="nofollow"><Icon type='github'/></a>
              <span dangerouslySetInnerHTML={{__html: config.copyRight}}/>
              <span dangerouslySetInnerHTML={{__html: config.icp}}/>
            </Footer>
          </Layout>
        </Layout>
      </Default>
    )
  }
}