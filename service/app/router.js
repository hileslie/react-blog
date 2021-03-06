'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/frontend')(app);
  require('./router/admin')(app);
};
