const { check, validationResult } = require("express-validator");

const addProduct2Cart = [
  check("product_id")
    .not()
    .isEmpty()
    .withMessage("product_id can not be empty!"),

  check("quantity").not().isEmpty().withMessage("quantity can not be empty!"),
  check("quantity").isNumeric().withMessage("quantity must be a number!"),
  check("quantity").isInt({ gt: 0 }).withMessage("quantity must be greater than 0!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const subtractProductFromCart = [
  check("product_id")
    .not()
    .isEmpty()
    .withMessage("product_id can not be empty!"),

  check("quantity").not().isEmpty().withMessage("quantity can not be empty!"),
  check("quantity").isNumeric().withMessage("quantity must be a number!"),
  check("quantity").isInt({ gt: 0 }).withMessage("quantity must be greater than 0!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const updateProductFromCart = [
  check("product_id")
    .not()
    .isEmpty()
    .withMessage("product_id can not be empty!"),

  check("quantity").not().isEmpty().withMessage("quantity can not be empty!"),
  check("quantity").isNumeric().withMessage("quantity must be a number!"),
  check("quantity")
    .isInt({ gt: 0 })
    .withMessage("quantity must be greater than 0!"),

  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

const removeProductFromCart = [
  check("product_id")
    .not()
    .isEmpty()
    .withMessage("product_id can not be empty!"),
  (req, res, next) => {
    const errors = validationResult(req);

    let error_data = errors.array().map((error) => {
      return {
        item_name: error.param,
        message: error.msg,
      };
    });

    if (!errors.isEmpty())
      return res.status(422).json({
        errors: error_data,
      });

    next();
  },
];

module.exports = {
  addProduct2Cart,
  subtractProductFromCart,
  updateProductFromCart,
  removeProductFromCart,
};
