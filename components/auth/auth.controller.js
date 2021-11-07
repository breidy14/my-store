const { request, response } = require('express');

const authService = require('./auth.service');
const service = new authService();

const signIn = async (req = request, res = response, next) => {
  try {
    const { email, password } = req.body;
    const data = await service.signIn(email, password);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const signUp = async (req = request, res = response, next) => {
  try {
    const { state, role, ...data } = req.body;
    const newUser = await service.signUp(data);

    res.status(200).json({ data: newUser });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  signIn,
  signUp,
};
