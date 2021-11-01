const { Router } = require('express');
const { validatorHandler } = require('../../middlewares/validator.handler');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  queryProductSchema,
} = require('./product.schema');

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require('./product.controller');

const router = Router();

router.get('/', validatorHandler(queryProductSchema, 'query'), getProducts);

router.post('/', validatorHandler(createProductSchema, 'body'), createProduct);

router.get('/:id', validatorHandler(getProductSchema, 'params'), getProduct);

router.put(
  '/:id',
  [
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
  ],
  updateProduct
);
router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  deleteProduct
);

module.exports = router;
