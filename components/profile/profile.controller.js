const { request, response } = require('express');

const ProfileService = require('./profile.service');

const service = new ProfileService();

const getMy = async (req = request, res = response, next) => {
  try {
    const { id } = req.user;
    const user = await service.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateMy = async (req = request, res = response, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const userDb = await service.update(user, body);
    res.status(201).json({ data: userDb });
  } catch (error) {
    next(error);
  }
};

const deleteMy = async (req = request, res = response, next) => {
  try {
    const user = req.user;
    const userDb = await service.delete(user);
    res.status(200).json({ data: userDb });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMy,
  updateMy,
  deleteMy,
};
