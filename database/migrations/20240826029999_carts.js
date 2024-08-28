exports.up = function (knex) {
  return knex.schema.createTable("carts", (table) => {
    // Main Columns
    table.uuid("id").primary();
    table.integer("quantity").unsigned().notNullable();
    table.float("total_price").unsigned().notNullable();
  
    table.uuid("user_id").notNullable();
    table.uuid("product_id").notNullable();
    table.uuid("transaction_id").nullable();
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    // Relations
    table.foreign("user_id").references("users.id");
    table.foreign("product_id").references("products.id");
    table.foreign("transaction_id").references("transactions.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("carts");
};
