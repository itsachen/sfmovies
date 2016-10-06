'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', () => {
      const title = 'WALL-E';

      return Controller.create({ title })
      .then((movie) => {
        expect(movie.get('name')).to.eql(title);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('name')).to.eql(title);
      });
    });

  });

});
