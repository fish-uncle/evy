import React, {Component} from 'react';
import {render} from 'react-dom';
import styled from 'styled-px2rem';

const LoadingStyle = styled.div`
   //background-color: rgba(0,0,0,.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 28px;
  color: #757575;
  
  &.loading-hide{
    display: none;
  }
  .loading-in-ajax-text{
    margin-top: 10px;
  }
  .loading-in-ajax-box{
    background-color: #ffffff;
    border: 1px solid #efefef;    
    width: 386px;
    height: 262px;
    border-radius: 20px;
    margin-bottom: 150px;
    
    img {
      width: 88px;
      height: 88px;
    }
  }
`;

class LoadingInAjax extends Component {
  constructor() {
    super();
    this.state = {
      show: 0
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

    return <LoadingStyle className={`flex-row-center ${show ? '' : 'loading-hide'}`}>
      <div className="loading-in-ajax-box flex-col-center">
        <img src={require('../../assets/loading/loadingInAjax.gif')} alt=""/>
        <span className="loading-in-ajax-text">加载中</span>
      </div>
    </LoadingStyle>;
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
