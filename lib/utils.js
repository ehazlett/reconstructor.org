exports.makeLocals = function(options) {
    var locals = {
        'title': app.set('appTitle'),
        'version': app.set('appVersion')
    }
    for (var k in options) {
        locals[k] = options[k] || "";
    }
    return locals;
}
