'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.text('city').notNullable();
    table.text('state').notNullable();
  });
};

exports.down = function (knex, Promise) {
  knex.schema.dropTable('locations');
};
