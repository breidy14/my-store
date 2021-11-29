const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const options = {
  dialect: 'postgres',
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelize = new Sequelize(
  `postgres:${config.db_user}:${config.db_password}@${config.db_host}:${config.db_port}/${config.db_name}`,
  options
);

setupModels(sequelize);

module.exports = sequelize;
