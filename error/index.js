'use strict';

const http = require('http');

function AppError (message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AppError);

    this.message = message || 'Error';
}
AppError.prototype.name = 'AppError';

function HttpError (status, message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || 'Error';
}
HttpError.prototype.name = 'HttpError';

module.exports.AppError = AppError;
module.exports.HttpError = HttpError;