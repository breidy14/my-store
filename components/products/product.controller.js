const { request, response } = require('express');

const ProductsService = require('./product.service');

const service = new ProductsService();

const getProducts = async (req = request, res = response) => {
  const { query } = req;
  const products = await service.find(query);

  res.status(200).json({
    data: products,
  });
};

const getProduct = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req = request, res = response) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
};

const updateProduct = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
