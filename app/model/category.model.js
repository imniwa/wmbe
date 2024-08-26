const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name"],

      properties: {
        name: {
          type: "string",
        },
      },
    };
  }
}

module.exports = Category;