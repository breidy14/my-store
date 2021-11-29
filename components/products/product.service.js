const { Op } = require('sequelize');
const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');
const ProductImagesService = require('./products-images/product-image.service');

const serviceProductImages = new ProductImagesService();
class ProductsService {
  async create({ data, files }) {
    const newProduct = await models.Product.create(data);
    if (files) {
      const images = await serviceProductImages.create({
        files,
        productId: newProduct.id,
      });
      newProduct.images = images;
    }
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category', 'images'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category', 'images'],
    });

    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update({ id, data, files }) {
    const productDb = await models.Product.findByPk(id);
    if (!productDb) {
      throw boom.notFound('product not found');
    }

    if (files) {
      const images = await models.ProductImages.findAll({
        where: { productId: productDb.id },
        attributes: ['id', 'url'],
      });

      await this.uploadImage(files, productDb, images);
    }

    const product = productDb.update(data);

    return product;
  }

  async delete(id) {
    const productDb = await models.Product.findByPk(id);
    if (!productDb) {
      throw boom.notFound('product not found');
    }

    const product = productDb.update({ state: false });

    return product;
  }
}

module.exports = ProductsService;
