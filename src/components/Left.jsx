'use strict';
import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {connect} from 'dva';
import {LeftActions} from "../models";

const {Sider} = Layout;
@connect((left, config) => ({...left, ...config}), {...LeftActions})
export default class Default extends Component {

  componentDidMount() {
    const resize = () => {
      window.innerWidth <= 900 && this.props.left_close();
    };
    window.onresize = resize;
    resize();
  }

  render() {
    const {left, config} = this.props;
    const {collapsed} = left;
    const {logo} = config;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" style={{backgroundImage: `url(${logo})`}}/>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user"/>
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera"/>
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload"/>
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}