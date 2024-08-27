exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    // Main Columns
    table.uuid("id").primary();
    table.integer("quantity").unsigned().notNullable();
    table.float("total_price").unsigned().notNullable();
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    // Relations
    table.uuid("product_id").notNullable();
    table.foreign("product_id").references("products.id");
    table.uuid("cart_id").notNullable();
    table.foreign("cart_id").references("carts.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
