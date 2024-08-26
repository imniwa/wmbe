const knex = require("../../config/database");
const User = require("../model/user.model");

const bcrypt = require("bcryptjs/dist/bcrypt");

const index = async (req, res) => {
  const trx = await knex.transaction({ readOnly: true });
  try {
    const users = await User.query(trx);
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "OK!",
      data: users,
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
    const user = await User.query(trx).insert({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "Success create!",
      data: user,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const show = async (req, res) => {
  const trx = await knex.transaction({ readOnly: true });
  try {
    const user = await User.query().findById(req.params.id);
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "OK!",
      data: user,
    });
  } catch (error) {
    await trx.rollback();
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update = async (req, res) => {
  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    const user = await User.query()
      .findById(req.params.id)
      .patch({
        name: req.body.name,
        email: req.body.email,
      });

      if(req.body.password){
        await User.query()
          .findById(req.params.id)
          .patch({
            password: await bcrypt.hash(req.body.password, 10),
          });
      }
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "Success update!",
      data: user,
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
    const user = await User.query().deleteById(req.params.id);
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "Success delete!",
      data: user,
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
  show,
  update,
  destroy,
};
