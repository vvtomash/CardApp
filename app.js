'use strict';

const express = require('express');

const path = require('path');
const session = require('./middleware/session');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('./constants');
const debug = require('./middleware/logger')(module);
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');
const db = require('./libs/db');

const app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

db.authenticate()
.then((err) => {
  debug.info('Connection has been established successfully.');
}).catch((err) => {
  debug.error('MySQL server has gone');
  app.response.send();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(app));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// error handlers
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//catch App error
app.use((err, req, res, next) => {
  if (err.name === 'AppError') {
    return res.json({
      error: {
        message: err.message,
        code: err.code || 0
      }
    })
  }
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;