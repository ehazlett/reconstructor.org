var makeLocals = require('../lib/utils').makeLocals;
var mongoose = require('mongoose');
var utils = require('../lib/utils');

exports.index = function(req, res){
    res.render('index.ejs', { 
        locals: makeLocals(req, {'title': 'home'})
    });
};
