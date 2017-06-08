'use strict';

const path = require('path');
const fs = require('fs');

exports.lookup = fs.readFileSync(path.join(__dirname, 'lookup.html'), {
  encoding: 'utf-8'
});
exports.create = require('./create');
exports.update = require('./update');
exports.list = require('./list');
exports.get = require('./get');
