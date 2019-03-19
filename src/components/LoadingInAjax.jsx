import React, {Component} from 'react';
import {render} from 'react-dom';
import './LoadingInAjax.less';
import {Spin, Icon} from 'antd';


class LoadingInAjax extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }

  show = _ => {
    this.setState({show: true});
  };

  hide = _ => {
    this.setState({show: false});
  };

  render() {
    const {show} = this.state;
    const antIcon = <Icon type="loading" style={{fontSize: 80}} spin/>;
    return <div className={`loading-in-ajax ${show ? '' : 'fn-hide'}`}>
      <div className="loading-container">
        <div className="loading-content">
          <Spin indicator={antIcon}/>
          <div className="loading-text">加载中...</div>
        </div>
      </div>
    </div>;
  }
}

let dom = document.getElementById('LoadingInAjax');
if (!dom) {
  dom = document.createElement('div');
  dom.setAttribute('id', 'LoadingInAjax');
  document.body.appendChild(dom);
}

const renderDom = render(<LoadingInAjax/>, dom);
export default renderDom;
