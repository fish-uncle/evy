import React, {Component} from 'react';
import {connect} from "dva";
// import {ModalActions} from "../models";
import {Modal} from 'antd';
import PropTypes from 'prop-types';

@connect(() => ({}), {})
export default class _Modal extends Component {

  hideModal = () => {
    this.props.modal_close();
  };

  render() {
    const {modal, children, onSubmit = this.hideModal, buttons = ['取消', '确认'], title = '', loading = false} = this.props;
    const {visible} = modal;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={onSubmit}
        onCancel={this.hideModal}
        okText={buttons[1]}
        confirmLoading={loading}
        keyboard={false}
        cancelText={buttons[0]}
      >
        {children}
      </Modal>
    )
  }
}

_Modal.propTypes = {
  onSubmit: PropTypes.func,
  buttons: PropTypes.array,
  title: PropTypes.string,
  loading: PropTypes.bool,
};
