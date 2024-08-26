exports.up = function (knex) {
  return knex.schema.createTable("transaction_details", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("quantity").unsigned().notNullable();
    table.float("total_price").unsigned().notNullable();
    table.integer("product_id").unsigned().notNullable();
    table.integer("transaction_id").unsigned().notNullable();
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    // Relations
    table.foreign("transaction_id").references("transactions.id");
    table.foreign("product_id").references("products.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transaction_details");
};
