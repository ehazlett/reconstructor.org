var assert = require('assert');
var utils = require('../lib/utils');
var makeLocals = utils.makeLocals;

suite('utils:', function() {
    suite('makeLocals', function() {
        var mockRequest = {}
        mockRequest.flash = function(){}

        test('appTitle key should exist in locals', function() {
            var locals = makeLocals(mockRequest);
            assert.equal(locals.hasOwnProperty('appTitle'), true);
        });
        test('appVersion key should exist in locals', function() {
            var locals = makeLocals(mockRequest);
            assert.equal(locals.hasOwnProperty('appVersion'), true);
        });
        test('extra key should exist in locals', function() {
            var locals = makeLocals(mockRequest, {'demo': null});
            assert.equal(locals.hasOwnProperty('demo'), true);
        });
        test('flash key should exist in locals', function() {
            var locals = makeLocals(mockRequest);
            assert.equal(locals.hasOwnProperty('flash'), true);
        });
        test('request key should exist in locals', function() {
            var locals = makeLocals(mockRequest);
            assert.equal(locals.hasOwnProperty('request'), true);
        });
    });
});
