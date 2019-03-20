'use strict';
import React, {Component, Fragment} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {connect} from 'dva';
import {LeftActions, RouterActions} from "../models";

const {SubMenu} = Menu;
const {Sider} = Layout;
@connect((left, config, sheet) => ({...left, ...config, ...sheet}), {...LeftActions, ...RouterActions})
export default class Default extends Component {

  componentWillMount() {
    // console.log(this.props)
    this.props.left_load();
  }

  componentDidMount() {
    const resize = () => {
      window.innerWidth <= 900 && this.props.left_close();
    };
    window.onresize = resize;
    resize();
  }

  chooseHandle = item => {
    if (item.type === 1) {
      this.props.push(item.url);
      this.props.left_choose({title: item.title})
    }
    if (item.type === 2) {
      window.open(item.url)
    }
  };

  menuRender = () => {
    const {left} = this.props;
    const {menu} = left;
    let html = [];
    for (let item in menu) {
      let _item = menu[item];
      html.push(
        _item.children ?
          <SubMenu key={_item.menu_id} title={<Fragment><Icon type={_item.icon}/><span>{_item.title}</span></Fragment>}>
            {_item.children.map(child => <Menu.Item key={child.menu_id} onClick={_ => {
              this.chooseHandle(child);
            }}>
              <span>{child.title}</span>
            </Menu.Item>)}
          </SubMenu> :
          <Menu.Item key={_item.menu_id} onClick={_ => {
            this.chooseHandle(_item);
          }}>
            <Icon type={_item.icon}/>
            <span>{_item.title}</span>
          </Menu.Item>
      )
    }
    return html;
  };

  render() {
    const {left, config} = this.props;
    const {collapsed, selectedKeys, openKeys, menu} = left;
    const {logo} = config;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo" style={{backgroundImage: `url(${logo.white})`}}/>
        {
          menu ? <Menu theme="dark" mode="inline" defaultOpenKeys={openKeys} selectedKeys={selectedKeys}
                       onOpenChange={openKeys => {
                         this.props.left_openkey({openKeys})
                       }}>
            {this.menuRender()}
          </Menu> : null
        }
      </Sider>
    )
  }
}