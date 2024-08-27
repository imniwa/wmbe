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

            required: ["user_id", "product_id", "quantity"],

            properties: {
                user_id: {
                    type: "string",
                },
                product_id: {
                    type: "string",
                },
                quantity: {
                    type: "integer",
                },
            },
        };
    }

    $beforeInsert(){
        this.id = uuid();
    }
}

module.exports = Cart;