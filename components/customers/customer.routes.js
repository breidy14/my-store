const { Router } = require('express');
const passport = require('passport');

const { validatorHandler, checkRoles } = require('../../middlewares');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('./customer.schema');

const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('./customer.controller');

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN']),
  getCustomers
);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  createCustomer
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN']),
  getCustomer
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN']),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  updateCustomer
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN']),
  validatorHandler(getCustomerSchema, 'params'),
  deleteCustomer
);

module.exports = router;
