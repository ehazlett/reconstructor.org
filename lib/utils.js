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
exports.createUser = function(options, cb) {
    var User = exports.getDbConnection().model('User');
    var u = new User();
    u.username = options.username;
    u.email = options.email;
    u.setPassword(options.password);
    u.confirmed = options.confirmed || false;
    u.save(function(err) {
        // TODO: send confirm email
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
        var authenticated = false;
        if (!user.confirmed) {
            err = 'Your account has not yet been confirmed.  Please check your email.';
            authenticated = false;
        } else {
            authenticated = user.authenticate(password);
        }
        cb(err, authenticated);
    });
};
exports.logoutUser = function(req, username, cb) {
    if (req.session.hasOwnProperty('username')) {
        cb(delete req.session.username);
    }
};
