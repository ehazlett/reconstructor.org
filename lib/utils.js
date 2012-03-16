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
