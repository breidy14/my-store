const { Router } = require('express');
const { validatorHandler } = require('../../middlewares/validator.handler');
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

router.get('/', getUsers);

router.post('/', validatorHandler(createUserSchema, 'body'), createUser);

router.get('/:id', validatorHandler(getUserSchema, 'params'), getUser);

router.put(
  '/:id',
  [
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
  ],
  updateUser
);
router.delete('/:id', validatorHandler(getUserSchema, 'params'), deleteUser);

module.exports = router;
