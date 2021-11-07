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

    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }

  async update(id, changes) {
    const userDb = await User.findByPk(id);

    if (!userDb) {
      throw boom.notFound('user not found');
    }

    const user = await userDb.update(changes);
    return user;
  }

  async delete(id) {
    const userDb = await User.findByPk(id, {
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
    const user = await userDb.update({ state: false });
    return user.id;
  }
}

module.exports = UsersService;
