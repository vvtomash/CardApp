'use strict';

var ENV = process.env.NODE_ENV;
var isWin = /^win/.test(process.platform);

class Logger {
    /**
     * Retuurn logger instance
     * @param module
     * @returns {exports.Logger|Logger|*}
     */
    static getLogger(module) {
        var winston = require('winston');
        var delimiter = isWin ? '\\' : '/';
        var path = module.filename.split(delimiter).slice(-2).join(delimiter);

        return new winston.Logger({
            transports: [
                new winston.transports.Console({
                    colorize: true,
                    level: (ENV === 'development') ? 'debug' : 'error',
                    label: path
                })
            ]
        });

    }
}

module.exports = Logger.getLogger;