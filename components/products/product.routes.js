const { Router } = require('express');
const passport = require('passport');
const { validatorHandler, checkRoles } = require('../../middlewares');
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  queryProductSchema,
  createProductImagesSchema,
} = require('./product.schema');

const {
  ProductImagesFilesSchema,
  ProductIdSchema,
  getProductImagesSchema,
} = require('./products-images/product-image.schema');

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require('./product.controller');

const {
  addImages,
  updateProductImages,
  deleteProductImages,
} = require('./products-images/product-image.controller');

const router = Router();

router.get('/', validatorHandler(queryProductSchema, 'query'), getProducts);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER']),
  validatorHandler(createProductSchema, 'body'),
  validatorHandler(createProductImagesSchema, 'files'),
  createProduct
);

router.post(
  '/images',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER']),
  validatorHandler(ProductIdSchema, 'body'),
  validatorHandler(ProductImagesFilesSchema, 'files'),
  addImages
);

router.put(
  '/images/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER']),
  validatorHandler(ProductIdSchema, 'body'),
  updateProductImages
);

router.delete(
  '/images/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER']),
  validatorHandler(getProductImagesSchema, 'params'),
  deleteProductImages
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
