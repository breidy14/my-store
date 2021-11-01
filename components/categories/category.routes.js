const { Router } = require('express');

const { validatorHandler } = require('../../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('./category.schema');

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('./category.controller');

const router = Router();

router.get('/', getCategories);

router.get('/:id', validatorHandler(getCategorySchema, 'params'), getCategory);

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  createCategory
);

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  updateCategory
);

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  deleteCategory
);

module.exports = router;
