'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('title');
  })
  .then(() => {
    return knex.raw('ALTER TABLE movies ALTER COLUMN name SET NOT NULL');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('movies', (table) => {
    table.text('title');
  })
  .then(() => {
    return knex.raw('ALTER TABLE movies ALTER COLUMN name DROP NOT NULL');
  });
};

