const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Transaction extends Model {
    static get tableName() {
        return "transactions";
    }
}

module.exports = Transaction;