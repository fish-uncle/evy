'use strict';
import React from 'react';
import {Button, notification, Modal, Icon} from 'antd';
import './button.less';

const {confirm} = Modal;

export default class SheetButton extends React.Component {

  state = {
    reloadStyle: 0
  };

  checkSelected = fn => {
    const {selected} = this.props;
    if (!selected) {
      notification.error({message: '提示', description: '请至少选择一个之后再进行操作'});
    } else {
      if (typeof fn === 'function') {
        fn(selected);
      }
    }
  };

  updateHandle = url => {
    const {rowKey} = this.props;
    this.checkSelected(selected => {
      confirm({
        title: '确定是否更新该条记录?',
        onOk() {
          window.open(url + '?' + rowKey + '=' + selected)
        },
      })
    });
  };

  deleteHandle = url => {
    const {update, rowKey} = this.props;
    this.checkSelected(selected => {
      confirm({
        title: '确定是否删除该条记录?',
        onOk() {
          let options = {};
          options[rowKey] = selected;
          fetch.post(url, options, ({data, success, msg}) => {
            update();
            notification.success({message: '提示', description: msg});
          })
        },
      })
    });
  };

  upperHandle = url => {
    const {update, rowKey} = this.props;
    this.checkSelected(selected => {
      confirm({
        title: '确定是否上架该条记录?',
        onOk() {
          let options = {};
          options[rowKey] = selected;
          fetch.post(url, options, ({data, success, msg}) => {
            update();
            notification.success({message: '提示', description: msg});
          })
        },
      })
    });
  };

  lowerHandle = url => {
    const {update, rowKey} = this.props;
    this.checkSelected(selected => {
      confirm({
        title: '确定是否下架该条记录?',
        onOk() {
          let options = {};
          options[rowKey] = selected;
          fetch.post(url, options, ({data, success, msg}) => {
            update();
            notification.success({message: '提示', description: msg});
          })
        },
      })
    });
  };

  recoverHandle = url => {
    const {update, rowKey} = this.props;
    this.checkSelected(selected => {
      confirm({
        title: '确定是否恢复该条记录?',
        onOk() {
          let options = {};
          options[rowKey] = selected;
          fetch.post(url, options, ({data, success, msg}) => {
            update();
            notification.success({message: '提示', description: msg});
          })
        },
      })
    });
  };

  reloadHandle = _ => {
    const {reload} = this.props;
    let {reloadStyle} = this.state;
    const ele = document.getElementsByClassName('sheet-button-reload')[0];
    reloadStyle = reloadStyle + 360;
    this.setState({reloadStyle}, _ => {
      ele.style.transform = 'rotate(' + reloadStyle + 'deg)';
      reload();
    });
  };

  authHtml = _ => {
    let result = [], ghost = [];
    const {button = []} = this.props;
    for (let i = 0; i < button.length; i++) {
      const {button_title, button_type, button_style, button_url} = button[i];
      ghost.push(true);
      let options;
      switch (button_type) {
        case 'insert':
          options = {
            href: button_url
          };
          break;
        case 'delete':
          options = {
            onClick: _ => {
              this.deleteHandle(button_url)
            },
            icon: 'scissor'
          };
          break;
        case 'update':
          options = {
            onClick: _ => {
              this.updateHandle(button_url)
            },
          };
          break;
        case 'upper':
          options = {
            icon: 'rise',
            onClick: _ => {
              this.upperHandle(button_url)
            },
          };
          break;
        case 'lower':
          options = {
            icon: 'fall',
            onClick: _ => {
              this.lowerHandle(button_url)
            },
          };
          break;
        case 'recover':
          options = {
            onClick: _ => {
              this.recoverHandle(button_url)
            }
          };
          break;
        case 'recovery':
          options = {
            icon: 'delete',
            href: button_url
          };
          break;
      }
      result[i] = <div key={i} title={button_title}
                       className={`${button_style === '1' ? 'fn-fl' : ''} ${button_type === 'view' ? 'fn-hide' : ''} ${button_style === '2' ? 'fn-fr' : ''} sheet-button-btn`}>
        <Button {...options} target='_blank' type="primary" ghost={true}>{button_title}</Button>
      </div>
    }
    return result;
  };

  render() {
    const {sync} = this.props;
    return (
      <div className='sheet-button-box fn-clear'>
        {
          sync ?
            <div className='sheet-button-btn fn-fl pointer sheet-button-reload' onClick={this.reloadHandle} title='刷新'>
              <Icon type='sync'/>
            </div> : null
        }
        {this.authHtml()}
      </div>
    )
  }

}
