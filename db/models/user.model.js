'use strict';
const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
//const sequelize = require('../../libs/sequelize');
const USER_TABLE = 'users';

const initUserModel = (sequelize) => {
  const UserSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    state: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'customer',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'create_at',
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
      defaultValue: Sequelize.NOW,
    },
  };

  class User extends Model {
    static associate(models) {
      this.hasOne(models.Customer, {
        as: 'customer',
        foreignKey: 'userId',
      });
    }

    static config(sequelize) {
      return {
        sequelize,
        tableName: USER_TABLE,
        modelName: 'User',
      };
    }
  }

  User.init(UserSchema, {
    sequelize,
    tableName: USER_TABLE,
    modelName: 'User',
  });

  User.addHook('beforeSave', async (user, options) => {
    return new Promise((res, rej) => {
      if (!user.changed('password')) return res();
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      user.password = hash;
      res();
    });
  });

  return User;
};
module.exports = { initUserModel, USER_TABLE };

/*User.beforeCreate(async (user,options)=>{
    return new Promise((res,rej)=>{
      if(user.password){
        bcrypt.hash(user.password, 10, function(error,hash){
          user.passwordHash = hash;
          res();
        })
      };
    });
  });*/
