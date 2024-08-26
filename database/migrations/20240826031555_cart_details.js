exports.up = function (knex) {
  return knex.schema.createTable("cart_details", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("quantity").unsigned().notNullable();
    table.float("total_price").unsigned().notNullable();
    table.integer("product_id").unsigned().notNullable();
    table.integer("cart_id").unsigned().notNullable();
    // Timestamps
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    // Relations
    table.foreign("cart_id").references("carts.id").onDelete("CASCADE");
    table.foreign("product_id").references("products.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cart_details");
};
