const AuthRouter = require("./auth");
const UserRouter = require("./user");
const CategoryRouter = require("./category");

const routes = (app, prefix) => {
  app.use(prefix, AuthRouter);
  app.use(prefix, UserRouter);
  app.use(prefix, CategoryRouter);
};

module.exports = routes;
