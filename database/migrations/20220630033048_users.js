exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    // Main Columns
    table.uuid("id").primary();
    table.string("name");
    table.string("email").unique();
    table.string("password");
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
