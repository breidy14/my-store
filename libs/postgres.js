const { Pool } = require('pg');

const { config } = require('./../config/config');
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

async function getConnection() {
  try {
    const pool = new Pool({ connectionString: URI });
    await pool.connect();
    console.log('Base de datos arriba');

    return pool;
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de iniciar la base de datos');
  }
}

module.exports = getConnection;
