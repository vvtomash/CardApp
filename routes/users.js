'use strict';

module.exports = module.exports = (router) => {
  router.get('/', (req, res, next) => {
    res.render('index', { title: 'Users' });
  });

  router.get('/profile', (req, res, next) => {
    res.send('return profile');
  });

  router.get('/:id', (req, res, next) => {
    res.send(req.params.id);
  });

  return router;
};