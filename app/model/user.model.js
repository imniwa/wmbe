const db = require("../../config/database");
const { v4: uuid } = require("uuid");
const { Model } = require("objection");

Model.knex(db);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "email", "password"],

      properties: {
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    };
  }

  $beforeInsert() {
    this.id = uuid();
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }
}

module.exports = User;
