const AuthRouter = require("./auth");
const UserRouter = require("./user");
const CategoryRouter = require("./category");
const ProductRouter = require("./product");
const CartRouter = require("./cart");
const TransactionRouter = require("./transaction");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, CategoryRouter);
  app.use(prefix, ProductRouter);
  // app.use(prefix, CartRouter)
  // app.use(prefix, TransactionRouter);
};

module.exports = routes;
