var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose')
  , settings = require('./settings').settings
  , schema = require('./lib/schema')
  , explore = require('./routes/explore')
  , buildservice = require('./routes/buildservice')

var RedisStore = require('connect-redis')(express);

app = module.exports.server = express.createServer();

// Configuration
app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view options', {
        layout: false
    });
    app.set('appTitle', 'reconstructor');
    app.set('appVersion', '0.1.0');
    app.set('SECRET_KEY', settings.SECRET_KEY);
    app.set('DB_HOST', settings.DB_HOST);
    app.set('DB_PORT', settings.DB_PORT);
    app.set('DB_NAME', settings.DB_NAME);
    app.set('DB_USER', settings.DB_USER);
    app.set('DB_PASS', settings.DB_PASS);
    //app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: settings.SESSION_SECRET, store: new RedisStore }));
    app.use(app.router);
    app.use(express.static(__dirname + '/static'));
});
app.register('.html', require('ejs'));

app.configure('development', function(){
    app.set('appVersion', 'dev');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('test', function(){
    app.set('appVersion', 'test');
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/explore', explore.index);
app.get('/buildservice', buildservice.index);
