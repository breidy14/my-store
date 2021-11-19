const { Router } = require('express');
const passport = require('passport');

const { validatorHandler, checkRoles } = require('../../middlewares');
const { getOrderSchema, addItemSchema } = require('./order.schema');

const {
  myOrders,
  createOrder,
  getOrder,
  addItemOrder,
} = require('./order.controller');

const router = Router();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  myOrders
);
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER', 'CUSTOMER']),
  validatorHandler(getOrderSchema, 'params'),
  getOrder
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER', 'CUSTOMER']),
  createOrder
);

router.post(
  '/item',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER', 'CUSTOMER']),
  validatorHandler(addItemSchema, 'body'),
  addItemOrder
);

router.delete(
  '/item',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER', 'CUSTOMER']),
  validatorHandler(addItemSchema, 'body'),
  addItemOrder
);

module.exports = router;
