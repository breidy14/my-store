const { Strategy, ExtractJwt } = require('passport-jwt');

const config = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JwtStrategy = new Strategy(options, (payload, done) => {
  const user = payload;
  return done(null, user);
});

module.exports = JwtStrategy;
