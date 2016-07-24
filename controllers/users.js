'use strict';

const UserModel = require('../models/user');
const AppError = require('../error/index').AppError;
const co = require('co');

class Users {
    getById(id, cb) {
        co(function *() {
            const user = yield UserModel.findById(id);
            if (user) {
                return cb(null, user);
            }
            cb(new AppError('User not found'));
        }).catch(cb);
    }
}

module.exports = new Users;
