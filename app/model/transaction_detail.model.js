const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class TransactionDetails extends Model {
    static get tableName() {
        return "transaction_details";
    }
}

module.exports = TransactionDetails;