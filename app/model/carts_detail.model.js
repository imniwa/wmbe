const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class CartDetails extends Model {
    static get tableName() {
        return "cart_details";
    }
}

module.exports = CartDetails;