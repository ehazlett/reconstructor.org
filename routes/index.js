var makeLocals = require('../lib/utils').makeLocals;

exports.index = function(req, res){
    res.render('index.ejs', { 
        locals: makeLocals({'title': 'home'})
    });
};

exports.explore = function(req, res){
    res.render('explore.ejs', {
        locals: makeLocals({'title': 'explore'})
    });
};
