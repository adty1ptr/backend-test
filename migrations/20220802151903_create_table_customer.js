/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex, Promise) {
  knex.schema.dropTableIfExists('customers').then(function(){
    return knex.schema.createTable('customers', function(t){
        t.increments('id').primary();
        t.integer('account_id');
        t.string('name');
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
