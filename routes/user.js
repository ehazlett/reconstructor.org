var mongoose = require('mongoose');
var utils = require('../lib/utils');
var makeLocals = utils.makeLocals;

exports.login_get = function(req, res) {
    res.render('login.ejs', {
        locals: makeLocals(req, {'title': 'login'})
    });
};
exports.login_post = function(req, res) {
    utils.loginUser(req, req.body.username, req.body.password, function(err, authenticated) {
        if (err) {
            req.flash('error', err);
            res.redirect('/login');
        } else if (!authenticated) {
            req.flash('error', 'Invalid username/password');
            res.redirect('/login');
        } else {
            res.redirect('/');
        }
    });
};
exports.logout_get = function(req, res) {
    utils.logoutUser(req, req.params.username, function(status) {
        req.flash('info', 'You have been logged out');
        res.redirect('/');
    });
}
exports.signup_get = function(req, res) {
    res.render('signup.ejs', {
        locals: makeLocals(req, {'title': 'signup'})
    });
};
exports.signup_post = function(req, res) {
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    };
    var errors = false;
    for (var d in data) {
        if (!data[d]) {
            req.flash('error', 'You must specify ' + d);
            errors = true;
            break;
        }
    }
    // check passwords
    if (!errors) {
        if (data.password != data.passwordConfirm) {
            req.flash('error', 'Passwords do not match');
            errors = true;
        }
    }
    if (errors) {
        res.render('signup.ejs', {
            locals: makeLocals(req, {
                'title': 'signup',
                'user': data
            })
        });
    } else { // everything good ; create account
        var options = {
            username: data.username,
            email: data.email,
            password: data.password
        }
        utils.createUser(options, function(user) {
            req.flash('info', 'Thanks!  Please check your email to confirm your account.');
            res.redirect('/login');
        });
    }
};
exports.signupConfirm_get = function(req, res) {
    var User = utils.getDbConnection().model('User');
    User.findOne({'confirmCode': req.params.confirmCode}, function(err, user) {
        if (!user) {
            req.flash('error', 'Unable to find a user with that code');
            res.redirect('/');
        } else {
            user.confirmed = true;
            user.save(function() {
                req.flash('info', 'Your account has been confirmed. Thanks!');
                res.redirect('/login');
            });
        }
    });
};
