const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class CategoryService {
  constructor() {}
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll({
      where: { state: true },
    });
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findOne({
      where: { id, state: true },
      include: ['products'],
    });

    if (!category) {
      throw boom.notFound('category not found');
    }

    return category;
  }

  async update(id, changes) {
    const categoryDb = await models.Category.findByPk(id);

    if (!categoryDb) {
      throw boom.notFound('category not found');
    }

    const category = await categoryDb.update(changes);
    return category.id;
  }

  async delete(id) {
    const category = await models.Category.findOne({
      where: { id, state: true },
    });

    if (!category) {
      throw boom.notFound('category not found');
    }

    const categoryUp = await category.update({ state: false });
    return categoryUp.id;
  }
}

module.exports = CategoryService;
