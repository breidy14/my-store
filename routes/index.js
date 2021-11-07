const { Router } = require('express');
const categoriesRouter = require('../components/categories/category.routes');
const customersRouter = require('../components/customers/customer.routes');
const ordersRouter = require('../components/orders/order.routes');
const productsRouter = require('../components/products/product.routes');
const usersRouter = require('../components/users/user.routes');
const authRouter = require('../components/auth/auth.routes');

function routerApi(app) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
}

module.exports = routerApi;
