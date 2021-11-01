const { Router } = require('express');

const { validatorHandler } = require('../../middlewares/validator.handler');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('./order.schema');

const {
  getOrders,
  createOrder,
  getOrder,
  addItemOrder,
} = require('./order.controller');

const router = Router();

router.get('/', getOrders);
router.get('/:id', validatorHandler(getOrderSchema, 'params'), getOrder);

router.post('/', validatorHandler(createOrderSchema, 'body'), createOrder);

router.post('/add-item', validatorHandler(addItemSchema, 'body'), addItemOrder);

module.exports = router;
