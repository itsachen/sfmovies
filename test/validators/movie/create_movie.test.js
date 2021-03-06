'use strict';

const Joi = require('joi');

const CreateMovieValidator = require('../../../lib/validators/movie/create_movie');

describe('create movie validator', () => {

  describe('title', () => {

    it('is required', () => {
      const payload = {};
      const result = Joi.validate(payload, CreateMovieValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('any.required');
    });

    it('is less than 255 characters', () => {
      const payload = { title: 'a'.repeat(260) };
      const result = Joi.validate(payload, CreateMovieValidator);

      expect(result.error.details[0].path).to.eql('title');
      expect(result.error.details[0].type).to.eql('string.max');
    });

  });

  describe('release_year', () => {

    it('is after 1878', () => {
      const payload = {
        title: 'foo',
        release_year: 1800
      };
      const result = Joi.validate(payload, CreateMovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.min');
    });

    it('is limited to 4 digits', () => {
      const payload = {
        title: 'foo',
        release_year: 12345
      };
      const result = Joi.validate(payload, CreateMovieValidator);

      expect(result.error.details[0].path).to.eql('release_year');
      expect(result.error.details[0].type).to.eql('number.max');
    });

  });

});
