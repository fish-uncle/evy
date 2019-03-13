'use strict';
import React, {Component} from 'react';
import {LocaleProvider} from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

export default class Default extends Component {

  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        {this.props.children}
      </LocaleProvider>
    )
  }
}