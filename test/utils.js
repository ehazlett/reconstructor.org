var assert = require('assert');
var makeLocals = require('../lib/utils').makeLocals;

suite('utils', function() {
    suite('makeLocals', function() {
        setup(function() {
        });
        test('appTitle key should exist in locals', function() {
            var locals = makeLocals();
            assert.equal(locals.hasOwnProperty('appTitle'), true);
        });
        test('appVersion key should exist in locals', function() {
            var locals = makeLocals();
            assert.equal(locals.hasOwnProperty('appVersion'), true);
        });
        test('extra key should exist in locals', function() {
            var locals = makeLocals({'demo': null});
            assert.equal(locals.hasOwnProperty('demo'), true);
        });
    });
});
