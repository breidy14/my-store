const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class OrderService {
  constructor() {}

  async create(user) {
    const data = {
      customerId: user.customer.id,
    };
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async findByUser(user) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': user.id,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });

    orders.forEach((order) => {
      delete order.customer.user.dataValues.password;
    });
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });

    if (!order) {
      throw boom.notFound('order not found');
    }
    delete order.customer.user.dataValues.password;
    return order;
  }

  async addItem(data, user) {
    const orderDb = await models.Order.findOne({
      where: { id: data.orderId, customerId: user.customer.id },
    });
    if (!orderDb) {
      throw boom.badRequest('order not found');
    }

    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async deleteItem(id, user) {
    const orderProductDb = await models.Order.findOne({
      where: {
        id,
        '$order.customer.userId$': user.id,
      },
      include: [
        {
          association: 'order',
          include: ['customer'],
        },
      ],
    });
    if (!orderProductDb) {
      throw boom.badRequest('order not found');
    }

    await orderProductDb.destroy();

    return id;
  }

  async delete(id) {
    return { id };
  }
}

module.exports = OrderService;
