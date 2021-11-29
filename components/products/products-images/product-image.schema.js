const Joi = require('joi');

const id = Joi.number().integer();
const productImages = Joi.array().max(4);
const productId = Joi.number().integer();

const ProductIdSchema = Joi.object({
  productId: productId.required(),
});

const ProductImagesFilesSchema = Joi.object({
  productImages: productImages.required(),
});

const getProductImagesSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  ProductIdSchema,
  getProductImagesSchema,
  ProductImagesFilesSchema,
};
