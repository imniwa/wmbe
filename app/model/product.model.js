const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "price", "category_id"],

      properties: {
        name: {
          type: "string",
        },
        price: {
          type: "float",
        },
        category_id: {
          type: "integer",
        },
      },
    };
  }
}

module.exports = Product;
