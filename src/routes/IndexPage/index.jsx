import React, {Component} from 'react';
import {connect} from 'dva';
import {Body} from '../../components';


@connect((config) => ({...config}), {})
export default class IndexPage extends Component {
  render() {
    const {config} = this.props;
    return (
      <Body style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%'}}>
      <img src={config.logo.gray} width={800} style={{margin: '0 auto'}}/>
      </Body>
    );
  }
}