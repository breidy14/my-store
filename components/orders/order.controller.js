const { request, response } = require('express');

const OrderService = require('./order.service');

const service = new OrderService();

const getOrders = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req = request, res = response, next) => {
  try {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

const addItemOrder = async (req = request, res = response, next) => {
  try {
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const order = await service.update(id, body);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  addItemOrder,
  updateOrder,
  deleteOrder,
};
