const db = require("../../config/database");
const { v4: uuid } = require("uuid");
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
          type: "number",
        },
        category_id: {
          type: "string",
        },
      },
    };
  }

  $beforeInsert(){
    this.id = uuid();
  }
}

module.exports = Product;
