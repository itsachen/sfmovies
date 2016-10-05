'use strict';

const Movie = require('../../../models/movie');

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
