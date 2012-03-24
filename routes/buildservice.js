var mongoose = require('mongoose');
var makeLocals = require('../lib/utils').makeLocals;

exports.index = function(req, res) {
    res.render('buildservice.ejs', {
        locals: makeLocals(req, {'title': 'build service'})
    });
};
