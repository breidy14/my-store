const passport = require('passport');
const { Router } = require('express');

const {
  validatorHandler,
  checkAdminRole,
  checkRoles,
} = require('../../middlewares/');
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
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createCategorySchema, 'body'),
  createCategory
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  updateCategory
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(getCategorySchema, 'params'),
  deleteCategory
);

module.exports = router;
