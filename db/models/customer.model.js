const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const initCustomerModel = (sequelize) => {
  const CustomerSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'last_name',
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    userId: {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: USER_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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

  class Customer extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'user' });
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'customerId',
      });
    }

    static config(sequelize) {
      return {
        sequelize,
        tableName: CUSTOMER_TABLE,
        modelName: 'Customer',
      };
    }
  }

  Customer.init(CustomerSchema, {
    sequelize,
    tableName: CUSTOMER_TABLE,
    modelName: 'Customer',
  });

  return Customer;
};
module.exports = { initCustomerModel, CUSTOMER_TABLE };
