'use strict';


module.exports = app => {

  app.validator.addRule('number', (rule, value) => {
    if (isNaN(value)) {
      return 'must be number'
    }
  });

};
