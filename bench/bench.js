/* globals bench suite set */
'use strict';
const camelcaseKeysNpm = require('keys-to-camelcase');
const camelcaseKeys = require('../lib/index');
const fixture = require('./fixture');

suite('camelcaseKeys', () => {
  set('mintime', 1000);

  bench('npm', () => {
    camelcaseKeysNpm(fixture, { deep: true });
  });

  bench('master', () => {
    camelcaseKeys(fixture, { deep: true });
  });
});
