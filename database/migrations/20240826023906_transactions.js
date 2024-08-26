exports.up = function (knex) {
  return knex.schema.createTable("transactions", (table) => {
    table.increments("id").primary().unsigned();
    table.float("total_amount").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    // Relations
    table.foreign("user_id").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("transactions");
};
