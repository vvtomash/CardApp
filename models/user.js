'use strict';

const Sequelize = require('sequelize');
const db = require('../libs/db');

var User = db.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: Sequelize.STRING, unique: true},
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    logins: Sequelize.INTEGER,
    last_login: Sequelize.INTEGER
}, {
    timestamps: false
});

module.exports = User;