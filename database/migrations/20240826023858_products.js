exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    // Main Columns
    table.uuid("id").primary();
    table.string("name");
    table.float("price");
    table.string("thumbnail");
    
    table.uuid("category_id").notNullable();
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
