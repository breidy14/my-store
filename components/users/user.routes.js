const { Router } = require('express');
const passport = require('passport');
const { validatorHandler, checkRoles } = require('../../middlewares');
const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} = require('./user.schema');

const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require('./user.controller');

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN']),
  getUsers
);

router.post('/', validatorHandler(createUserSchema, 'body'), createUser);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN']),
  validatorHandler(getUserSchema, 'params'),
  getUser
);

router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN']),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN']),
  validatorHandler(getUserSchema, 'params'),
  deleteUser
);

module.exports = router;
