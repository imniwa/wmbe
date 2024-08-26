const knex = require("../../config/database");
const Category = require("../model/category.model");
const Product = require("../model/product.model");

const index = async (req, res) => {
  const trx = await knex.transaction({ readOnly: true });
  try {
    const products = await Product.query(trx);
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "OK!",
      data: products,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const byCategory = async (req, res) => {
  const trx = await knex.transaction({ readOnly: true });
  try {
    const products = await Product.query(trx).where(
      "category_id",
      req.params.category_id
    );
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "OK!",
      data: products,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const store = async (req, res) => {
  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    let categoryCheck = await Category.query(trx)
      .where("id", req.body.category_id)
      .first();
    if (!categoryCheck) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }

    const product = await Product.query(trx).insert({
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category_id,
    });
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: product,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const destroy = async (req, res) => {
  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    const product = await Product.query(trx).deleteById(req.params.id);
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: product,
    });
  } catch (error) {
    await trx.rollback();
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
