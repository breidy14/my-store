const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  customer: Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
  }),
});

const updateUserSchema = Joi.object({
  email,
  role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
