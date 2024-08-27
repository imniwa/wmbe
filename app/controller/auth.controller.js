const bcrypt = require("bcryptjs/dist/bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../model/user.model");
const knex = require("../../config/database");

const login = async (req, res) => {
  const trx = await knex.transaction({ readOnly: true });
  try {
    const user = await User.query(trx)
      .select([
        "users.id",
        "users.name",
        "users.email",
        "users.password",
        "users.created_at",
        "users.updated_at",
      ])
      .where("email", req.body.email)
      .first();

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const user_data = await User.query(trx)
        .select([
          "users.id",
          "users.name",
          "users.email",
          "users.password",
          "users.created_at",
          "users.updated_at",
        ])
        .where("id", user.id)
        .first();

      const token = jsonwebtoken.sign(user_data.toJSON(), process.env.APP_KEY, {
        expiresIn: "2h",
      });

      user_data.token = token;

      await trx.commit();
      res.status(200).json({
        message: "Login success!",
        data: user_data
      });

    } else {
      await trx.commit();
      res.status(400).json({
        message: "Invalid Credentials!",
      });
    }
  } catch (error) {
    await trx.rollback();
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const register = async (req, res) => {
  const trx = await knex.transaction({ isolationLevel: "read committed" });
  try {
    let userCheck = await User.query(trx).where("email", req.body.email).first();
    if (userCheck) {
      return res.status(400).json({
        status: 400,
        message: "Email not available!",
      });
    }

    const user = await User.query(trx).insert({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    
    await trx.commit();
    res.status(200).json({
      status: 200,
      message: "OK",
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
  login,
  register,
};
