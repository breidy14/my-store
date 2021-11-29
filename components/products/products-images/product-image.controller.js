const { request, response } = require('express');

const ProductImagesService = require('./product-image.service');

const service = new ProductImagesService();

const addImages = async (req = request, res = response) => {
  const { productId } = req.body;
  const files = req.files;
  const newProductImages = await service.create({ productId, files });
  res.status(201).json(newProductImages);
};

const updateProductImages = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    const files = req.files;
    const ProductImages = await service.update({ id, productId, files });
    res.json(ProductImages);
  } catch (error) {
    next(error);
  }
};

const deleteProductImages = async (req = request, res = response) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
};

module.exports = {
  addImages,
  updateProductImages,
  deleteProductImages,
};
