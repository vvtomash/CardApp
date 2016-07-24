'use strict';

const users = require(`${PATH_CONTROLLERS}/users`);

module.exports = module.exports = (router) => {

    router.get('/:id', (req, res, next) => {
        users.getById(req.params.id, (err, user) => {
            if(err) {
                return next(err);
            }
            res.json({data: user});
        });
        //res.render('index', {title: 'Users'});
    });

    router.get('/profile', (req, res, next) => {
        res.send('return profile');
    });

    router.get('/', (req, res, next) => {
        res.send(req.params.id);
    });



    return router;
};