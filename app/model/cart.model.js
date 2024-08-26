const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Cart extends Model {
    static get tableName() {
        return "carts";
    }
}

module.exports = Cart;