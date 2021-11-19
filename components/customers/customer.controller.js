const { request, response } = require('express');

const CustomerService = require('./customer.service');

const service = new CustomerService();

const getCustomers = async (req = request, res = response, next) => {
  try {
    const customers = await service.find();
    res.json({ data: customers });
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.json({ data: customer });
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req = request, res = response, next) => {
  try {
    const body = req.body;
    const customer = await service.create(body);
    res.status(201).json({ data: customer });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const customer = await service.update(id, body);
    res.status(201).json({ data: customer });
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const customer = await service.delete(id);
    res.status(200).json({ data: customer });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
