var mongoose = require('mongoose');
var utils = require('../lib/utils');
var makeLocals = utils.makeLocals;

exports.login_get = function(req, res) {
    var User = utils.getDbConnection().model('User');
    res.render('login.ejs', {
        locals: makeLocals(req, {'title': 'login'})
    });
}
exports.login_post = function(req, res) {
    var User = utils.getDbConnection().model('User');
    User.findOne({username: req.body.username}, function(err, doc) {
        if (!doc) {
            req.flash('error', 'Invalid username/password');
            res.redirect('/login');
        } else {
            // login user
            res.redirect('/');
        }
    });
}

exports.signup_get = function(req, res) {
    res.render('signup.ejs', {
        locals: makeLocals(req, {'title': 'signup'})
    });
}
