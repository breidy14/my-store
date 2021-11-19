const { request, response } = require('express');

const OrderService = require('./order.service');

const service = new OrderService();

const getOrder = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const myOrders = async (req = request, res = response, next) => {
  try {
    const user = req.user;
    const orders = await service.findByUser(user);
    res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req = request, res = response, next) => {
  try {
    const user = req.user;
    const orders = await service.create(user);
    res.status(200).json({ data: orders });
  } catch (error) {
    next(error);
  }
};

const addItemOrder = async (req = request, res = response, next) => {
  try {
    const body = req.body;
    const user = req.user;
    const newItem = await service.addItem(body, user);
    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

const deleteItemOrder = async (req = request, res = response, next) => {
  try {
    const { id } = req.body;
    const user = req.user;
    const rta = await service.delete(id, user);
    res.json(rta);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrder,
  createOrder,
  myOrders,
  addItemOrder,
  deleteItemOrder,
};
