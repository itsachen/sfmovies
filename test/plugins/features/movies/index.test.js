'use strict';

const Movie  = require('../../../../lib/models/movie');
const Movies = require('../../../../lib/server');

describe('movies integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return Movies.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

  describe('list', () => {

    it('lists movies', () => {
      const attributes = {
        name: 'The Room',
        release_year: 2003
      };

      new Movie().save(attributes);
      return Movies.inject({
        url: '/movies?title=The%20Room',
        method: 'GET'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.length).to.not.eql(0);
        expect(response.result[0].object).to.eql('movie');
      });
    });

  });

});
