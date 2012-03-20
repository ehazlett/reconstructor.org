var assert = require('assert');
var utils = require('../lib/utils');
var makeLocals = utils.makeLocals;

suite('utils', function() {
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

suite('user', function() {
    suite('create/delete', function() {
        var mockRequest = {}
        mockRequest.session = {}

        var userData = {
            username: 'demo1234',
            email: 'demo@demo.local',
            password: 'demo'
        }
        test('user creation should succeed', function(done) {
            utils.createUser(userData.username, userData.email, userData.password, function(user) {
                assert.notEqual(user, null);
                done();
            });
        });
        test('user should have username, email and password should be hashed', function(done) {
            utils.getUser(userData.username, function(err, doc) {
                assert.equal(err, null);
                assert.notEqual(doc.username, undefined);
                assert.notEqual(doc.email, undefined);
                assert.notEqual(doc.password, undefined);
                assert.notEqual(doc.password, userData.password); // make sure password is hashed
                done();
            });
        });
        test('user authentication should succeed', function(done) {
            utils.loginUser(mockRequest, userData.username, userData.password, function(err, status) {
                assert.equal(err, null);
                assert.equal(status, true);
                assert.equal(mockRequest.session.hasOwnProperty('username'), true);
                done();
            });
        });
        test('user logout should succeed', function(done) {
            utils.logoutUser(mockRequest, userData.username, function(status) {
                assert.equal(status, true);
                assert.equal(mockRequest.session.hasOwnProperty('username'), false);
                done();
            });
        });
        test('user deletion should succeed', function(done) {
            utils.deleteUser(userData.username, function(err) {
                assert.equal(err, null);
                done();
            });
        });
    });
});
