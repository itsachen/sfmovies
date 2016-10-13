'use strict';

const Bluebird = require('bluebird');

const LocationsMovies = require('../../lib/models/locations_movies');
const Location        = require('../../lib/models/location');
const Movie           = require('../../lib/models/movie');

describe('movie model', () => {

  describe('serialize', () => {

    it('includes all of the necessary fields', () => {
      let movie;

      return Bluebird.all([
        new Movie().save({
          name: 'Its a Wonderful Life',
          release_year: 1946
        }),
        new Location().save({
          city: 'New York',
          state: 'NY'
        })
      ])
      .spread((m, l) => {
        movie = m;
        return new LocationsMovies()
        .save({
          location_id: l.get('id'),
          movie_id: m.get('id')
        });
      })
      .then(() => movie.serialize())
      .then((serializedMovie) => {
        expect(serializedMovie).to.have.all.keys([
          'id',
          'title',
          'release_year',
          'locations',
          'object'
        ]);
      });
    });

  });

  describe('locations', () => {

    it('fetches associated locations', () => {
      let movie;
      const locationAttributes = {
        city: 'San Francisco',
        state: 'CA'
      };

      return new Movie()
      .save({
        name: 'Ye Olde Test Movie', release_year: 1947
      })
      .then((m) => movie = m)
      .then(() => new Location().save(locationAttributes))
      .then((l) => {
        return new LocationsMovies()
        .save({
          location_id: l.get('id'),
          movie_id: movie.get('id')
        });
      })
      .then(() => movie.locations())
      .then((locations) => {
        expect(locations.length).to.not.eql(0);
        expect(locations.at(0).get('city')).to.eql('San Francisco');
      });
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
