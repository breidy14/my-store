const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const initCategoryModel = (sequelize) => {
  const CategorySchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
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

  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'categoryId',
      });
    }

    static config(sequelize) {
      return {
        sequelize,
        tableName: CATEGORY_TABLE,
        modelName: 'Category',
      };
    }
  }

  Category.init(CategorySchema, Category.config(sequelize));
  return Category;
};
module.exports = { initCategoryModel, CATEGORY_TABLE };
