import React, {Component} from 'react';
import {connect} from 'dva';
import {Link} from 'dva/router';
import './index.less';
import {RouterActions} from '../../models/index';

@connect(({activity, login}) => ({...activity, ...login}), {...RouterActions})
export default class IndexPage extends Component {

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {

    return (
      <div>111</div>
    );
  }
}