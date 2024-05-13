'use strict';

const pluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const globals = require('globals');
const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    ignores: ['coverage/', 'node_modules/'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.mocha,
        ...globals.node
      }
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error'
    }
  },
  pluginPrettierRecommended
];
