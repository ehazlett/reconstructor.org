var makeLocals = require('../lib/utils').makeLocals;

exports.index = function(req, res){
    res.render('index.ejs', { 
        locals: makeLocals()
    });
};
