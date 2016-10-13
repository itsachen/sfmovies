'use strict';

const Bookshelf = require('../libraries/bookshelf');
const Knex      = require('../libraries/knex');
const Location  = require('./location');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',

  locations: function () {
    return Knex('locations_movies')
    .where('movie_id', this.get('id'))
    .then((result) => {
      const locationIds = result.map((r) => r.location_id);
      return new Location().query((qb) => {
        qb.whereIn('id', locationIds);
      })
      .fetchAll();
    });
  },

  filterByYear: function (releaseYear, releaseYearStart, releaseYearEnd) {
    return this.query((qb) => {
      if (releaseYear) {
        qb.where('release_year', '=', releaseYear);
      }
      if (releaseYearStart) {
        qb.where('release_year', '>=', releaseYearStart);
      }
      if (releaseYearEnd) {
        qb.where('release_year', '<=', releaseYearEnd);
      }
    });
  },

  filterByTitle: function (title) {
    return this.query((qb) => {
      if (title) {
        qb.where('name', 'LIKE', `%${title}%`);
      }
    });
  },

  serialize: function () {
    return this.locations()
    .then((locations) => {
      const serializedLocations = locations.map((location) => location.serialize());
      return {
        id: this.get('id'),
        title: this.get('name'),
        release_year: this.get('release_year'),
        locations: serializedLocations,
        object: 'movie'
      };
    });
  }
});
