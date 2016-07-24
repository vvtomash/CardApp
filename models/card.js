'use strict';

const Sequelize = require('sequelize');
const db = require('../libs/db');

var Card = db.define('card', {
        multiverse_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        card_name: Sequelize.STRING,
        mana_cost: Sequelize.STRING,
        converted_mana_cost: Sequelize.INTEGER,
        types: Sequelize.STRING,
        card_text: Sequelize.STRING,
        loyalty: null,
        flavor_text: null,
        expansion: Sequelize.STRING,
        rarity: Sequelize.STRING,
        card_number: null,
        pt: null,
        artist: Sequelize.STRING,
        double_face: 0,
        language: Sequelize.STRING,
        url: Sequelize.STRING
    }, {
        timestamps: false
    });

module.exports = Card;