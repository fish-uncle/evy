'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    const {config} = this.app;
    const {access} = config;
    let defaultMiddleware = [];
    access.enabled ? defaultMiddleware.push('access') : void 0;
  }

}

module.exports = AppBootHook;