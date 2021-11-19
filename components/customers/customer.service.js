const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class CustomerService {
  constructor() {}

  async find() {
    const customers = await models.Customer.findAll({
      include: ['user'],
    });
    customers.forEach((customer) => {
      delete customer.user.dataValues.password;
    });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findOne({
      where: { id, state: true },
      include: ['user'],
    });
    if (!customer) {
      throw boom.notFound('customer not found');
    }

    delete customer.user.dataValues.password;
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });

    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const customerDb = await models.Customer.findOne({
      where: {
        id,
      },
    });
    if (!customerDb) {
      throw boom.notFound('customer not found');
    }
    console.log(changes);
    const customer = await customerDb.update(changes);

    return customer;
  }

  async delete(id) {
    const customerDb = await models.Customer.findOne({
      where: {
        id,
      },
      include: 'user',
    });

    if (!customerDb) {
      throw boom.notFound('customer not found');
    }

    const userId = customerDb.dataValues.user.dataValues.userId;
    if (userId) {
      const user = await models.User.findOne({
        where: { id: userId },
      });
      user.update({ state: false });
    }

    const customer = await customerDb.update({ state: false });
    return customer.id;
  }
}

module.exports = CustomerService;
