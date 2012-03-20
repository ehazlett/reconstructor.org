var mongoose = require('mongoose');
var makeLocals = require('../lib/utils').makeLocals;

exports.index = function(req, res) {
    res.render('explore.ejs', {
        locals: makeLocals(req, {'title': 'explore'})
    });
};
