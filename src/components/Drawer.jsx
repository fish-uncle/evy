import React, {Component} from 'react';
import {connect} from "dva";
import {DrawerActions} from "../models";
import {Drawer} from 'antd';
import PropTypes from 'prop-types';
import './Drawer.less';

@connect((drawer) => ({...drawer}), {...DrawerActions})
export default class _Drawer extends Component {

  hideDrawer = () => {
    this.props.drawer_detail_close();
  };

  render() {
    const {drawer, children, title = '', ...others} = this.props;
    const {visible} = drawer;
    return (
      <Drawer
        className='detail-container'
        title={title}
        visible={visible}
        closable={false}
        onClose={this.hideDrawer}
        {...others}
      >
        {children}
      </Drawer>
    )
  }
}

_Drawer.propTypes = {
  title: PropTypes.string,
};
