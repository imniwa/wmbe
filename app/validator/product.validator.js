const { check, validationResult } = require("express-validator");

const store = [
  check("name").not().isEmpty().withMessage("name can not be empty!"),

  check("price").not().isEmpty().withMessage("price can not be empty!"),
  check("price").toFloat().isNumeric().withMessage("price must be a number!"),
  check("price")
    .isFloat({ gt: 0 })
    .withMessage("price must be greater than 0!"),

  check("category_id")
    .not()
    .isEmpty()
    .withMessage("category_id can not be empty!"),
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
  store,
};
