const { request, response } = require('express');

const CategoryService = require('./category.service');

const service = new CategoryService();

const getCategories = async (req = request, res = response, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req = request, res = response, next) => {
  try {
    const { state, ...data } = req.body;
    const newCategory = await service.create(data);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    const { state, ...data } = req.body;
    const category = await service.update(id, data);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req = request, res = response, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
