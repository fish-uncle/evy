'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    const {config} = this.app;
    const {gzip} = config;
    let defaultMiddleware = [];
    gzip.enabled ? defaultMiddleware.push('gzip') : void 0;
  }

}

module.exports = AppBootHook;