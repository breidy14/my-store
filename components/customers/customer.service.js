const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.Customer.findOne({
      where: { id, state: true },
      include: ['user'],
    });
    if (!user) {
      throw boom.notFound('customer not found');
    }
    return user;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });

    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const userDb = await models.Customer.findOne(id);
    if (!userDb) {
      throw boom.notFound('customer not found');
    }

    const rta = await models.Customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customerDb = await models.Customer.findByPk(id, {
      include: ['user'],
    });

    if (!customerDb) {
      throw boom.notFound('customer not found');
    }

    const customerUp = await customerDb.update({ state: false });
    if (customerDb.User.id) {
      const user = await models.User.findOne({
        where: { id: customerDb.userId },
      });
      user.update({ state: false });
    }

    return customerUp.id;
  }
}

module.exports = CustomerService;
