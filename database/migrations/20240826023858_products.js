exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name");
    table.float("price");
    table.integer("category_id").unsigned().notNullable();
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    // Relations
    table.foreign("category_id").references("categories.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
