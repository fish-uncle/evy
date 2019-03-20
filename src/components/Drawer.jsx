import React, {Component} from 'react';
import {connect} from "dva";
import {SheetActions} from "../models";
import {Drawer} from 'antd';
import PropTypes from 'prop-types';
import './Drawer.less';

@connect((sheet) => ({...sheet}), {...SheetActions})
export default class _Drawer extends Component {

  hideDrawer = () => {
    this.props.drawer_close();
  };

  render() {
    const {sheet, children, title = '', ...others} = this.props;
    const {drawerVisible} = sheet;
    return (
      <Drawer
        destroyOnClose={true}
        className='detail-container'
        title={title}
        visible={drawerVisible}
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
