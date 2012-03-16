
/**
 * Module dependencies.
 */
var app = require('./server');

app.server.listen(3000);
console.log("Express server listening on port %d in %s mode", app.server.address().port, app.server.settings.env);