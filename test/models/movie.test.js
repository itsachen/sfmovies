'use strict';

const Movie = require('../../lib/models/movie');

describe('movie model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      const movie = Movie.forge().serialize();

      expect(movie).to.have.all.keys([
        'id',
        'title',
        'release_year',
        'object'
      ]);
    });

    it('returns the name or title column as the title', () => {
      const title = 'The Room';

      const movieWithTitle = Movie.forge({ title }).serialize();
      const movieWithName = Movie.forge({ name: title }).serialize();

      expect(movieWithTitle.title).to.eql(title);
      expect(movieWithName.title).to.eql(title);
    });

  });

});
