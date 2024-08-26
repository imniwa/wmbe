const Category = require("../model/category.model");
const Product = require("../model/product.model");

const index = async (req, res) => {
  try {
    const products = await Product.query();
    res.status(200).json({
      status: 200,
      message: "OK!",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const byCategory = async (req, res) => {
  try {
    const products = await Product.query().where(
      "category_id",
      req.params.category_id
    );
    res.status(200).json({
      status: 200,
      message: "OK!",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  try {
    let categoryCheck = await Category.query()
      .where("id", req.body.category_id)
      .first();
    if (!categoryCheck) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    const product = await Product.query().insert({
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
    });

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.query().deleteById(req.params.id);
    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  index,
  byCategory,
  store,
  destroy,
};
