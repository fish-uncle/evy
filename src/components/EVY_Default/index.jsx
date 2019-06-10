'use strict';
import React, {Component} from 'react';
import * as Sentry from '@sentry/browser';
import {LocaleProvider} from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

Sentry.init({
  dsn: "https://fb2dedd217ca40a4b8f540abc45ff49c@sentry.io/1478316",
  release: `${process.env.NODE_ENV}${pkg.version}`,
  environment: `${process.env.NODE_ENV === 'production' ? 'production' : 'test'}`
});
export default class Default extends Component {

  componentDidCatch(error, errorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
    });
  }

  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        {this.props.children}
      </LocaleProvider>
    )
  }
}