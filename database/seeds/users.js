const bcrypt = require("bcryptjs/dist/bcrypt");

exports.seed = async function (knex) {
  return await knex("users").insert([
    {
      name: "Taufik Hidayat",
      email: "test@example.com",
      password: await bcrypt.hash("test123", 10),
    },
    {
      name: "Kurniawan Ronaldi Purnama",
      email: "kur@example.com",
      password: await bcrypt.hash("ytta123", 10),
    }
  ]);
};
