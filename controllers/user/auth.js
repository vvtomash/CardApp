'use strict';

const co = require('co');
const crypto = require('crypto');
const salt = require('config').sessionSalt;
const UserModel = require('../../models/user');

class Auth {
    signup(request, response, next) {
        co(function *() {
            let email = request.body.email;
            let username = request.body.username;
            let password = request.body.password;
            let user = yield UserModel.findOne({where: {email: email}});
            if (user) {
                return response.send({
                    error: {
                        message: 'User already exists'
                    }
                });
            }
            let newUser = yield UserModel.create({
                email: email,
                username: username,
                password: Auth._encryptPassword(password)
            });
            request.session.authorized = true;
            request.session.userId = newUser.id;
            return response.send({
                user: newUser
            });
        }).catch((error) => {
            next(error);
        });
    }

    login(request, response, next) {
        let email = request.body.email;
        UserModel.findOne({where: {email: email}})
        .then((user) => {
            if (user && Auth._checkPassword(user, request.body.password)) {
                request.session.authorized = true;
                request.session.userId = user.id;
                return response.send({
                    msg: 'Success login email: ' + user.username
                });
            }
            response.send({
                error: {
                    message: 'Check your email or password'
                }
            });
        }).catch((error) => {
            next(error);
        });
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