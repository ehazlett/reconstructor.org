
/**
 * Module dependencies.
 */
var app = require('./server');
var cluster = require('cluster');
var PORT = 3000;

if (app.server.settings.env == 'production') {
    var CPUS = require('os').cpus().length;
    if (cluster.isMaster) {
        console.log('Starting app on port %d in %s mode', PORT, app.server.settings.env);
        for (var i=0; i < CPUS; i++) {
            cluster.fork();
        }   
        cluster.on('death', function(worker) {
            console.log('Worker ' + worker.pid + ' died.  restarting...');
            cluster.fork();
        }); 
    } else {
        app.server.listen(PORT);
        console.log('Worker ' + process.env.NODE_WORKER_ID + ' started');
    }   
} else {
    app.server.listen(PORT);
    console.log("Application started on port %d in %s mode", app.server.address().port, app.server.settings.env);
}
