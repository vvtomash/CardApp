'use strict';

const express = require('express');
const auth = require(`${PATH_CONTROLLERS}/auth`);
const logger = require(`${PATH_ROOT}/middleware/logger`)(module);

let routes = {
    "/": "main",
    "/users": "users",
    "/home": "home"
};

module.exports = (app) => {
    app.post('/login', (req, res, next) => {
        auth.login(req.body.email, req.body.password, (err, user) => {
            if (err) {
                return next(err);
            }
            req.session.authorized = true;
            req.session.userId = user.id;
            res.json({
                data: user
            });
        });
    });

    app.post('/signup', (req, res, next) => {
        auth.signup(req.body.email, req.body.username, req.body.password, (err, user) => {
            if (err) {
                return next(err);
            }
            req.session.authorized = true;
            req.session.userId = user.id;
            res.json({
                data: user
            });
        });
    });

    for (let route in routes) {
        let handler = routes[route];
        let router = require(`./${handler}`)(express.Router());
        app.use(route, router);
    }
}

function checkAuth(req, res, next) {
    if (req.authorized) {
        next();
    }
    res.send({
        errors: {
            msg: 'Need auth'
        }
    });
}