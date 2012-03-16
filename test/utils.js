var assert = require('assert');
var makeLocals = require('../lib/utils').makeLocals;

suite('utils', function() {
    suite('methods', function() {
        setup(function() {
        });
        test('key should exist in locals', function() {
            var locals = makeLocals({'demo': null});
            assert.equal(locals.hasOwnProperty('demo'), true);
        });
    });
});
