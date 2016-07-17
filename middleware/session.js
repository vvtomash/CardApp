'use strict';

const session = require('express-session');
const uuid = require('uuid');
const config = require('config');

module.exports = (app) => {
    let options = {
        secret: config.sessionSalt,
        resave: false,
        saveUninitialized: true,
        genid: function(req) {
            return uuid.v4()
        },
        cookie: {}
    }

    if (app.get('env') === 'production') {
        app.set('trust proxy', 1);
        options.cookie.secure = true;
    }

    return session(options);
}

module.exports.savesession = (data) => {
    let options = {
        secret: config.sessionSalt,
        resave: false,
        saveUninitialized: true,
        genid: function(req) {
            return genuuid()
        },
        cookie: {}
    }

    if (app.get('env') === 'production') {
        app.set('trust proxy', 1);
        options.cookie.secure = true;
    }

    return session(options);
}

