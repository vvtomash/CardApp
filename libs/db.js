'use strict';

const Sequelize = require('sequelize');
const config = require('config');

module.exports = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});