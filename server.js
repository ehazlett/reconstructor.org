var express = require('express')
  , routes = require('./routes')

app = module.exports.server = express.createServer();

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view options', {
        layout: false
    });
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/static'));
});
app.register('.html', require('ejs'));

app.configure('development', function(){
    app.set('appTitle', 'reconstructor : dev');
    app.set('appVersion', 'dev');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.set('appTitle', 'reconstructor');
    app.set('appVersion', '0.1');
    app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
