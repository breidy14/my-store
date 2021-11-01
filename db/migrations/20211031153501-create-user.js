'use strict';
const { UserSchema } = require('./../models/user.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('users', UserSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};
