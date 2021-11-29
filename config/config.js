require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  server_port: process.env.SERVER_PORT || 3000,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_host: process.env.DB_HOST,
  db_name: process.env.DB_NAME,
  db_port: process.env.DB_PORT,
  jwtSecret: process.env.JWTSECRET || 'your secret kasjdfiaw4',
};
module.exports = {
  config,
};
