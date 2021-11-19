const { Router } = require('express');
const passport = require('passport');
const { validatorHandler, checkRoles } = require('../../middlewares');
const { updateProfileSchema } = require('./profile.schema');

const { getMy, updateMy, deleteMy } = require('./profile.controller');

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER', 'CUSTOMER']),
  getMy
);
router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER', 'CUSTOMER']),
  validatorHandler(updateProfileSchema, 'body'),
  updateMy
);
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['ADMIN', 'SELLER', 'CUSTOMER']),
  deleteMy
);

module.exports = router;
