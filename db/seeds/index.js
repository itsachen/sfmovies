'use strict';

const Bluebird = require('bluebird');

const Locations = require('./data/locations');
const Movies    = require('./data/movies');

exports.seed = function (Knex) {
  return Bluebird.all([
    Knex('movies').truncate(),
    Knex('locations').truncate()
  ])
  .then(() => {
    return Bluebird.all([
      Knex('movies').insert(Movies),
      Knex('locations').insert(Locations)
    ]);
  });
};
