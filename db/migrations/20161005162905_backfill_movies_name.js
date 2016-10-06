'use strict';

exports.up = function (knex, Promise) {
  return knex.raw('UPDATE movies SET name = title');
};

exports.down = function (knex, Promise) {
  return Promise.resolve();
};
