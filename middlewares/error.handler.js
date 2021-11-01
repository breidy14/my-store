const boom = require('@hapi/boom');
const { ValidationError } = require('sequelize');

const logErrors = (err, req, res, next) => {
  console.error(err);
  next(err);
};

const boomErrorHandler = (err, req, res, next) => {
  if (!err.isBoom) {
    next(err);
  }
  const { output } = err;
  return res.status(output.statusCode).json(output.payload);
};

const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

function ormErrorHandler(err, req, res, next) {
  if (!(err instanceof ValidationError)) {
    next(err);
  }
  return res.status(409).json({
    statusCode: 409,
    message: err.name,
    errors: err.errors,
  });
}

module.exports = {
  logErrors,
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
};
