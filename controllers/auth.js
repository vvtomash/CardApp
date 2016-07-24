'use strict';

const co = require('co');
const crypto = require('crypto');
const salt = require('config').sessionSalt;
const UserModel = require(`${PATH_MODELS}/user`);
const AppError = require(`${PATH_ERROR}/index`).AppError;

class Auth {
    signup(email, username, password, cb) {
        co(function *() {
            let user = yield UserModel.findOne({where: {email: email}});
            if (user) {
                return cb(new AppError('User already exists'));
            }
            let newUser = yield UserModel.create({
                email: email,
                username: username,
                password: Auth._encryptPassword(password)
            });
            cb(null, newUser);
        }).catch(cb);
    }

    login(email, password, cb) {
        co(function* () {
            const user = yield UserModel.findOne({where: {email: email}});
            if (user && Auth._checkPassword(user, password)) {
                UserModel.loginIncrease(user);
                return cb(null, user);
            }
            cb(new AppError('Check your email or password'));
        }).catch(cb);
    }

    static _encryptPassword(password) {
        let hash = crypto.createHash('md5');
        return hash.update(`${password}${salt}`).digest('hex');
    }

    static _checkPassword(user, password) {
        return user.password === Auth._encryptPassword(password);
    }
}

module.exports = new Auth;