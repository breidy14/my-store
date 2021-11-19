const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class ProfileService {
  constructor() {}

  async findOne(id) {
    const userDb = await models.User.findOne({
      where: { id, state: true },
      include: ['customer'],
    });
    if (!userDb) {
      throw boom.notFound('user not found');
    }

    delete userDb.dataValues.password;
    return userDb;
  }

  async update(user, changes) {
    const userDb = await models.User.findOne({
      where: {
        id: user.id,
      },
      include: ['customer'],
    });
    if (!userDb) {
      throw boom.notFound('user not found');
    }

    const rta = await userDb.update(changes);

    return rta;
  }

  async delete(user) {
    const userDb = await models.User.findOne({
      where: { id: user.id, state: true },
      include: ['customer'],
    });

    if (!userDb) {
      throw boom.notFound('user not found');
    }

    if (userDb.Customer.userId) {
      const customer = await models.Customer.findOne({
        where: { userId: userDb.Customer.userId },
      });
      customer.update({ state: false });
    }
    const rta = await userDb.update({ state: false });
    return rta.id;
  }
}

module.exports = ProfileService;
