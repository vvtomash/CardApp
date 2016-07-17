'use strict';

const express = require('express');
const auth = require('../controllers/user').auth;
const logger = require('../middleware/logger')(module);

let routes = {
  "/": "main",
  "/users": "users",
  "/home": "home"
};

module.exports = (app) => {

  app.use('/', (req, res, next) => {
    logger.debug(req.body);
    next();
  });
  ;
  app.post('/login', auth.login);
  app.post('/signup', auth.signup);

  for (let route in routes) {
    let handler = routes[route];
    let router = require(`./${handler}`)(express.Router());
    app.use(route, router);
  }
}

function checkAuth(req, res, next) {
  if(req.authorized) {
    next();
  }
  res.send({
    errors: {
      msg: 'Need auth'
    }
  });
}