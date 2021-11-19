const boom = require('@hapi/boom');

function checkAdminRole(req, res, next) {
  const { role } = req.user;
  if (role === 'ADMIN') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkRoles(roles) {
  return (req, res, next) => {
    const { role } = req.user;
    if (roles.includes(role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  };
}

module.exports = { checkAdminRole, checkRoles };
