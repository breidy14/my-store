const { Router } = require('express');

const { validatorHandler } = require('../../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('./customer.schema');

const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require('./customer.controller');

const router = Router();

router.get('/', getCustomers);

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  createCustomer
);

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  updateCustomer
);

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  deleteCustomer
);

module.exports = router;
