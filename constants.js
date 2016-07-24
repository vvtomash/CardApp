'use strict';

const path = require('path');

global.PATH_ROOT = path.resolve(__dirname);
global.PATH_MODELS = `${PATH_ROOT}/models`;
global.PATH_LIBS = `${PATH_ROOT}/libs`;
global.PATH_CONTROLLERS = `${PATH_ROOT}/controllers`;
global.PATH_ERROR = `${PATH_ROOT}/error`;