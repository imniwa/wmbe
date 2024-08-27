const db = require("../../config/database");
const { v4: uuid } = require("uuid");
const { Model } = require("objection");

Model.knex(db);

class Transaction extends Model {
    static get tableName() {
        return "transactions";
    }
    $beforeInsert(){
        this.id = uuid();
    }
}

module.exports = Transaction;