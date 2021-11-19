const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');
const User = models.User;
class UsersService {
  async create(data) {
    const userDb = await this.findByEmail(data.email);
    if (userDb) {
      throw boom.badRequest('The email already Exists');
    }

    const newUser = await User.create(data, {
      include: ['customer'],
    });

    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await User.findAll({ where: { state: true } });

    users.forEach((user) => {
      delete user.dataValues.password;
    });
    return users;
  }

  async findOne(id) {
    const user = await User.findOne({
      where: { id, state: true },
      include: ['customer'],
    });

    if (!user) {
      throw boom.notFound('user not found');
    }
    delete user.dataValues.password;

    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  async update(id, changes) {
    const userDb = await User.findOne({
      where: { id, state: true },
      include: ['customer'],
    });

    if (!userDb) {
      throw boom.notFound('user not found');
    }

    if (changes.role) {
      changes.role = changes.role.toUpperCase();
    }

    const user = await userDb.update(changes);
    delete user.dataValues.password;
    return user;
  }

  async delete(id) {
    const userDb = await User.findOne({
      where: { id, state: true },
      include: ['customer'],
    });

    if (!userDb) {
      throw boom.notFound('user not found');
    }
    const userId = userDb.dataValues.customer.dataValues.userId;
    if (userId) {
      const customer = await models.Customer.findOne({
        where: { userId },
      });
      customer.update({ state: false });
    }
    const rta = await userDb.update({ state: false });
    return rta.id;
  }
}

module.exports = UsersService;
