const authHandler = require('./auth.handler');
const errorHandler = require('./error.handler');
const validatorHandler = require('./validator.handler');

module.exports = {
  ...authHandler,
  ...errorHandler,
  ...validatorHandler,
};
