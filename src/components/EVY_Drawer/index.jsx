import React, {Component} from 'react';
import {connect} from "dva";
import {SheetActions} from "../../models";
import {Drawer, Button} from 'antd';
import PropTypes from 'prop-types';
import './index.less';
import {insert, search, update, clear} from "../../utils/handle";

@connect((sheet) => ({...sheet}), {...SheetActions})
export default class _Drawer extends Component {

  hideDrawer = () => {
    this.props.drawer_close();
  };

  render() {
    const {sheet, children, title = '', ...others} = this.props;
    const {drawerVisible, drawerType, updateUrl, insertUrl} = sheet;
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
        {
          drawerType === 'insert' || drawerType === 'detail' ? <div className='pos-a btn-container'>
            {
              drawerType === 'insert' ?
                insertUrl !== '' ? <Button type='primary' block onClick={() => insert(this.props)}>新增</Button> : null :
                updateUrl !== '' ? <Button type='primary' block onClick={() => update(this.props)}>更新</Button> : null
            }
          </div> : null
        }
        {
          drawerType === 'search' ? <div className='pos-a btn-container btn-2'>
            <Button block onClick={() => clear(this.props)}>清空</Button>
            <Button type='primary' block onClick={() => search(this.props)}>搜索</Button>
          </div> : null
        }
      </Drawer>
    )
  }
}

_Drawer.propTypes = {
  title: PropTypes.string,
};
