const { request, response } = require('express');

const CustomerService = require('./customer.service');

const service = new CustomerService();

const getCustomers = async (req = request, res = response, next) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
};

const getCustomer = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const customer = await service.findOne(id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req = request, res = response, next) => {
  try {
    const body = req.body;
    res.status(201).json(await service.create(body));
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    res.status(201).json(await service.update(id, body));
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    res.status(200).json(await service.delete(id));
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
