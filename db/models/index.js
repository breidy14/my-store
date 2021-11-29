const { initUserModel } = require('./user.model');
const { initCustomerModel } = require('./customer.model');
const { initCategoryModel } = require('./category.model');
const { initProductModel } = require('./product.model');
const { initProductImages } = require('./product-images.model');
const { initOrderModel } = require('./order.model');
const { initOrderProduct } = require('./order-product.model');

function setupModels(sequelize) {
  const User = initUserModel(sequelize);
  const Customer = initCustomerModel(sequelize);
  const Category = initCategoryModel(sequelize);
  const Product = initProductModel(sequelize);
  const ProductImages = initProductImages(sequelize);
  const Order = initOrderModel(sequelize);
  const OrderProduct = initOrderProduct(sequelize);

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  ProductImages.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
}

module.exports = setupModels;
