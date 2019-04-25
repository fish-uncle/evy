import React, {Component} from 'react';
import {connect} from 'dva';
import {Statistic} from 'antd';
import moment from "moment";
import {Body} from '../../components';
import './index.less';

let timer;
@connect(() => ({}), {})
export default class IndexPage extends Component {

  state = {
    deadline: Date.now()
  };

  componentDidMount() {
    timer = setInterval(() => {
      this.setState({
        deadline: Date.now()
      })
    })
  }

  componentWillUnmount() {
    clearTimeout(timer)
  }

  render() {
    const {deadline} = this.state;
    return (
      <Body style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%'}}>
      <Statistic style={{margin: '0 auto'}} value={deadline} formatter={(value) => {
        return moment(value).format('YYYY年MM月DD日 HH:mm:ss')
      }}/>
      </Body>
    );
  }
}