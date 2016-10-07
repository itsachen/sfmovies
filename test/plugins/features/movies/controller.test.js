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

  describe('findAll', () => {

    it('returns all movies if no filters are provided', () => {
      return new Movie().fetchAll().then((results) => {
        return Controller.findAll({})
        .then((response) => {
          expect(response.length).to.eql(results.length);
        });
      });
    });

    it('returns movies filtered by exact release_year', () => {
      const attributes = {
        name: 'The Room Part 2',
        release_year: 2004
      };

      return new Movie()
      .save(attributes)
      .then(() => {
        const query = {
          release_year: 2004
        };

        return Controller.findAll(query)
        .then((response) => {
          expect(response.length).to.not.eql(0);
          expect(response.at(0).get('name')).to.eql('The Room Part 2');
        });
      });
    });

    it('returns movies filtered by release_year range', () => {
      const attributes = {
        name: 'The Room Part 3',
        release_year: 2005
      };

      return new Movie()
      .save(attributes)
      .then(() => {
        const query = {
          release_year_start: 2000,
          release_year_end: 2010
        };

        return Controller.findAll(query)
        .then((response) => {
          expect(response.length).to.not.eql(0);
          expect(response.at(0).get('name')).to.eql('The Room Part 3');
        });
      });
    });

    it('returns movies filtered by title', () => {
      const attributes = {
        name: 'The Room Part 4',
        release_year: 2006
      };

      return new Movie()
      .save(attributes)
      .then(() => {
        const query = {
          title: 'The Room Part 4'
        };

        return Controller.findAll(query)
        .then((response) => {
          expect(response.length).to.not.eql(0);
          expect(response.at(0).get('name')).to.eql('The Room Part 4');
        });
      });
    });

  });

});
