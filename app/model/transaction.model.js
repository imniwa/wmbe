const db = require("../../config/database");
const { v4: uuid } = require("uuid");
const { Model } = require("objection");

Model.knex(db);

class Transaction extends Model {
  static get tableName() {
    return "transactions";
  }

  $beforeInsert() {
    this.id = uuid();
  }

  static get relationMappings() {
    const Cart = require("./cart.model");

    return {
      cart: {
        relation: Model.HasManyRelation,
        modelClass: Cart,
        join: {
          from: "transactions.id",
          to: "carts.transaction_id",
        },
      },
    };
  }
}

module.exports = Transaction;
