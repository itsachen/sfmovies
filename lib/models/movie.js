'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'movies',

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
    return {
      id: this.get('id'),
      title: this.get('name'),
      release_year: this.get('release_year'),
      object: 'movie'
    };
  }
});
