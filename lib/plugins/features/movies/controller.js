'use strict';

const Movie = require('../../../models/movie');

exports.findAll = (query) => {
  return new Movie()
  .filterByYear(query.release_year, query.release_year_start, query.release_year_end)
  .filterByTitle(query.title)
  .query((qb) => {
    qb.orderBy('movies.release_year', 'desc');
  })
  .fetchAll();
};

exports.create = (payload) => {
  const attributes = {
    name: payload.title,
    release_year: payload.release_year
  };

  return new Movie().save(attributes)
  .then((movie) => {
    return new Movie({ id: movie.id }).fetch();
  });
};
