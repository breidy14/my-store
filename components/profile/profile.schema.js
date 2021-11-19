const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();

const updateProfileSchema = Joi.object({
  email,
  password,
  customer: Joi.object({
    name,
    lastName,
    phone,
  }),
});

const updateUserSchema = Joi.object({
  email,
  role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { updateProfileSchema, updateUserSchema, getUserSchema };
