exports.up = function (knex) {
  return knex.schema.createTable("carts", (table) => {
    // Main Columns
    table.uuid("id").primary();
    table.float("total_amount").notNullable().defaultTo(0);
    table.boolean("checkout").defaultTo(false);
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    // Relations
    table.uuid("user_id").notNullable();
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("carts");
};
