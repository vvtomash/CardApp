'use strict';

module.exports = (router) => {
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Home' });
    });
    return router;
};
