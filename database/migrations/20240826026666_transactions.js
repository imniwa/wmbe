exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    // Main Columns
    table.uuid("id").primary();
    table.float("total_amount", 12).unsigned().notNullable();
    table.datetime('date').notNullable();

    table.uuid("user_id").notNullable();
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    // Relations
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
