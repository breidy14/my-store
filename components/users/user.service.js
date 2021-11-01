const boom = require('@hapi/boom');

//const { User } = require('../../db/models/user.model');
const { models } = require('../../libs/sequelize');
const User = models.User;
class UsersService {
  async create(data) {
    const newUser = await User.create(data);

    return newUser;
  }

  async find(page, limit) {
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

  async update(id, changes) {
    const user = await User.findByPk(id);

    if (!user) {
      throw boom.notFound('user not found');
    }

    const userUp = await user.update(changes);
    return userUp;
  }

  async delete(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw boom.notFound('user not found');
    }

    const userUp = await user.update({ state: false });
    return userUp.id;
  }
}

module.exports = UsersService;
