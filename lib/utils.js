var mongoose = require('mongoose');

exports.makeLocals = function(options) {
    var locals = {
        'appTitle': app.set('appTitle'),
        'appVersion': app.set('appVersion')
    }
    for (var k in options) {
        locals[k] = options[k] || "";
    }
    return locals;
}

exports.getDbConnection = function() {
    return mongoose.connect(app.set('DB_HOST'), app.set('DB_NAME'), app.set('DB_PORT'));
}
