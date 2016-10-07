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

  });

  describe('filterByYear', () => {

    it('filters by exact release_year', () => {
      const attributes = {
        name: 'Godzilla',
        release_year: 2014
      };

      return new Movie()
      .save(attributes)
      .then(() => {
        return new Movie()
        .filterByYear(2014, null, null)
        .fetchAll();
      })
      .then((collection) => {
        expect(collection.length).to.not.eql(0);
        expect(collection.at(0).get('name')).to.eql('Godzilla');
      });
    });

    it('filters by release_year range', () => {
      const attributes = {
        name: 'Godzilla: Part 2',
        release_year: 2016
      };

      return new Movie()
      .save(attributes)
      .then(() => {
        return new Movie()
        .filterByYear(null, 2015, 2017)
        .fetchAll()
        .then((collection) => {
          expect(collection.length).to.not.eql(0);
          expect(collection.at(0).get('name')).to.eql('Godzilla: Part 2');
        });
      });
    });

  });

  describe('filterByTitle', () => {

    it('filters by exact title', () => {
      const attributes = {
        name: 'Star Wars',
        release_year: 1977
      };

      return new Movie()
      .save(attributes)
      .then(() => {
        return new Movie()
        .filterByTitle('Star Wars')
        .fetchAll()
        .then((collection) => {
          expect(collection.length).to.not.eql(0);
          expect(collection.at(0).get('name')).to.eql('Star Wars');
        });
      });
    });

    it('filters by approximate title', () => {
      const attributes = {
        name: 'Star Trek 2',
        release_year: 1982
      };

      return new Movie()
      .save(attributes)
      .then(() => {
        return new Movie()
        .filterByTitle('Trek')
        .fetchAll()
        .then((collection) => {
          expect(collection.length).to.not.eql(0);
          expect(collection.at(0).get('name')).to.eql('Star Trek 2');
        });
      });
    });

  });

});
