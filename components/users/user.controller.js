const { request, response } = require('express');

const UserService = require('./user.service');

const service = new UserService();

const getUsers = async (req = request, res = response, next) => {
  try {
    const { page, limit } = req.query;
    const users = await service.find(page, limit);

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req = request, res = response, next) => {
  try {
    const { state, role, ...data } = req.body;

    const newUser = await service.create(data);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await service.update(id, body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const user = await service.delete(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
