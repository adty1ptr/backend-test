/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    knex.schema.dropTableIfExists('transactions').then(function(){
        return knex.schema.createTable('transactions', function(t){
            t.increments('id').primary();
            t.integer('account_id');
            t.datetime('transaction_date')
            t.string('description');
            t.string('debit_credit_status', 1);
            t.float('amount', 8, 0);
            t.timestamp('created_at').defaultTo(knex.fn.now());
            t.timestamp('updated_at').defaultTo(knex.fn.now());
        })
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
