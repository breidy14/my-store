const { Model, DataTypes, Sequelize } = require('sequelize');

const { PRODUCT_TABLE } = require('./product.model');

const PRODUCT_IMAGES_TABLE = 'product_images';

const initProductImages = (sequelize) => {
  const ProductImagesSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    numberImg: {
      field: 'number_img',
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    productId: {
      field: 'product_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: PRODUCT_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: Sequelize.NOW,
    },
  };

  class ProductImages extends Model {
    static associate(models) {
      this.belongsTo(models.Product, { as: 'product' });
    }

    static config(sequelize) {
      return {
        sequelize,
        tableName: PRODUCT_IMAGES_TABLE,
        modelName: 'ProductImages',
      };
    }
  }

  ProductImages.init(ProductImagesSchema, ProductImages.config(sequelize));

  return ProductImages;
};

module.exports = { initProductImages, PRODUCT_IMAGES_TABLE };
