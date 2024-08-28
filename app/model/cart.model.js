const db = require("../../config/database");
const { v4: uuid } = require("uuid");
const { Model } = require("objection");

Model.knex(db);

class Cart extends Model {
  static get tableName() {
    return "carts";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["user_id", "product_id", "quantity", "total_price"],

      properties: {
        user_id: {
          type: "string",
        },
        product_id: {
          type: "string",
        },
        quantity: {
          type: "number",
        },
        total_price: {
          type: "number",
        },
        transaction_id: {
          type: "string",
        },
      },
    };
  }

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/product.model",
        join: {
          from: "carts.product_id",
          to: "products.id",
        },
      },
    };
  }

  $beforeInsert() {
    this.id = uuid();
  }
}

module.exports = Cart;
