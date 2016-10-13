'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('locations_movies', (table) => {
    table.increments('id').primary();
    table.integer('movie_id');
    table.integer('location_id');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('locations_movies');
};
