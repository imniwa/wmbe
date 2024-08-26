const Category = require("../model/category.model");

const index = async (req, res) => {
  try {
    const categories = await Category.query();
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
  try {
    let categoryCheck = await Category.query().where("name", req.body.name).first();
    if (categoryCheck) {
      return res.status(400).json({
        status: 400,
        message: "Category already exists!",
      });
    }
    
    const category = await Category.query().insert({
      name: req.body.name,
    });

    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: category,
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
  store,
};
