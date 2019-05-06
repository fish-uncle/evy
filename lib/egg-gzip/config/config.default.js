'use strict';
module.exports = appInfo => {

  const config = {
    gzip: {
      enabled: true,
      threshold: 1024
    },
  };
  return config;
};

