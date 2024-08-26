const knex = require("../../config/database");
const Category = require("../model/category.model");

const index = async (req, res) => {
  const trx = await knex.transaction({ readOnly: true });
  try {
    const categories = await Category.query(trx);
    res.status(200).json({
      status: 200,
      message: "OK!",
      data: categories,
    });
  } catch (error) {
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
      .where("name", req.body.name)
      .first();
    if (categoryCheck) {
      return res.status(400).json({
        status: 400,
        message: "Category already exists!",
      });
    }

    const category = await Category.query(trx).insert({
      name: req.body.name,
    });
    await trx.commit();

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: category,
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
  store,
};
