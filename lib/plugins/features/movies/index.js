'use strict';

const Controller            = require('./controller');
const CreateMovieValidator  = require('../../../validators/movie/create_movie');
const FindAllMovieValidator = require('../../../validators/movie/find_all_movie');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: CreateMovieValidator
      }
    }
  }, {
    method: 'GET',
    path: '/movies',
    config: {
      handler: (request, reply) => {
        reply(Controller.findAll(request.query));
      },
      validate: {
        query: FindAllMovieValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
