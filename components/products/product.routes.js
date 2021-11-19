const { Router } = require('express');
const passport = require('passport');
const { validatorHandler, checkRoles } = require('../../middlewares');
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

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER']),
  validatorHandler(createProductSchema, 'body'),
  createProduct
);

router.get('/:id', validatorHandler(getProductSchema, 'params'), getProduct);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER']),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  updateProduct
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER']),
  validatorHandler(getProductSchema, 'params'),
  deleteProduct
);

module.exports = router;
