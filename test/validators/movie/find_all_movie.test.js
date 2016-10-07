'use strict';

const Joi = require('joi');

const FindAllMovieValidator = require('../../../lib/validators/movie/find_all_movie');

describe('find all movie validator', () => {

  describe('title', () => {

    it('is less than 255 characters', () => {
      const payload = { title: 'a'.repeat(260) };
      const result = Joi.validate(payload, FindAllMovieValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = {
        release_year: 1800
      };
      const result = Joi.validate(payload, FindAllMovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        title: 'foo',
        release_year: 12345
      };
      const result = Joi.validate(payload, FindAllMovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

  describe('release_year_start', () => {

    it('is after 1878', () => {
      const payload = {
        release_year_start: 1800
      };
      const result = Joi.validate(payload, FindAllMovieValidator);

      expect(result.error.details[0].path).to.eql('release_year_start');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        title: 'foo',
        release_year_start: 12345
      };
      const result = Joi.validate(payload, FindAllMovieValidator);

      expect(result.error.details[0].path).to.eql('release_year_start');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

  describe('release_year_end', () => {

    it('is after 1878', () => {
      const payload = {
        release_year_end: 1800
      };
      const result = Joi.validate(payload, FindAllMovieValidator);

      expect(result.error.details[0].path).to.eql('release_year_end');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        title: 'foo',
        release_year_end: 12345
      };
      const result = Joi.validate(payload, FindAllMovieValidator);

      expect(result.error.details[0].path).to.eql('release_year_end');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});
