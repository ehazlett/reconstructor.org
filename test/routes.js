var assert = require('assert');
var http = require('http');
var server = require('../server').server

var makeRequest = function(options, cb) {
    var req = http.request(options, function(res) {
        var data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            cb(res, data);
        });
    });
    req.end();
}

suite('routes', function() {
    suite('/', function() {
        var options = {
            path: "/",
            port: 3001
        };
        setup(function() {
            server.listen(options.port);
        });
        test('should return 200', function(done) {
            http.get(options, function(res) {
                assert.equal(res.statusCode, 200);
                done();
            });
        });
    });
});
