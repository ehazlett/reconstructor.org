var mongoose = require('mongoose');

exports.makeLocals = function(req, options) {
    var locals = {
        'appTitle': app.set('appTitle'),
        'appVersion': app.set('appVersion'),
        'request': req,
        'flash': req.flash(),
    }
    for (var k in options) {
        locals[k] = options[k] || "";
    }
    return locals;
};
exports.getDbConnection = function() {
    return mongoose.connect(app.set('DB_HOST'), app.set('DB_NAME'), app.set('DB_PORT'));
};
exports.createUser = function(username, email, password, cb) {
    var User = exports.getDbConnection().model('User');
    var u = new User();
    u.username = username;
    u.email = email;
    u.setPassword(password);
    u.save(function(err) {
        cb(u);
    });
};
exports.getUser = function(username, cb) {
    var User = exports.getDbConnection().model('User');
    User.findOne({'username': username}, function(err, doc) {
        cb(err, doc);
    });
};
exports.deleteUser = function(username, cb) {
    var User = exports.getDbConnection().model('User');
    User.remove({'username': username}, function(err) {
        cb(err);
    });
};
exports.loginUser = function(req, username, password, cb) {
    var User = exports.getDbConnection().model('User');
    User.findOne({'username': username}, function(err, user) {
        req.session.username = username;
        cb(err, user.authenticate(password));
    });
};
exports.logoutUser = function(req, username, cb) {
    if (req.session.hasOwnProperty('username')) {
        cb(delete req.session.username);
    }
};
