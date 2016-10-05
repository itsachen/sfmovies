'use strict';

const Hapi = require('hapi');

const Config = require('../config');

const server = new Hapi.Server({
  connections: {
    router: { stripTrailingSlash: true }
  }
});

server.connection({ port: Config.PORT });

server.register([
  require('hapi-bookshelf-serializer')
], (err) => {
  /* istanbul ignore if */
  if (err) {
    throw err;
  }
});

module.exports = server;