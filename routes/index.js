const AuthRouter = require("./auth");
const UserRouter = require("./user");
const CategoryRouter = require("./category");
const ProductRouter = require("./product");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, CategoryRouter);
  app.use(prefix, ProductRouter);
};

module.exports = routes;
