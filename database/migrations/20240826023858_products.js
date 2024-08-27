exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    // Main Columns
    table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
    table.string("name");
    table.float("price");
    table.string("thumbnail");
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    // Relations
    table.uuid("category_id").notNullable();
    table.foreign("category_id").references("categories.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
