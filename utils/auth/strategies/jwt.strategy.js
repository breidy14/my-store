const boom = require('@hapi/boom');
const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');
const { models } = require('../../../libs/sequelize');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await models.User.findOne({
      where: { id: payload.sub, state: true },
      attributes: ['id', 'role'],
      include: ['customer'],
    });
    if (!user) {
      throw boom.unauthorized();
    }
    return done(null, user);
  } catch (error) {
    return error;
  }
});

module.exports = JwtStrategy;
