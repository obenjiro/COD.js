var express         = require('express'),
    bodyParser      = require('body-parser'),
    morgan          = require('morgan'),
    config          = require('./config'),
    constants       = require('./config/const'),
    expressError    = require('express-error')
    app             = express();

// Parse bodies!
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logging ( morgan can do log rotation )
app.use(morgan('dev'));

// View Helpers
app.use(function(req, res, next) {
  res.locals.version = config.version;
  next();
});

// Set routes
app.use('/api/v1', require('./routes/v1/api'));

// Handle 500 errors in dev mode
if (config.enviroment === constants.DEV) {
    app.use(expressError.express3({
        contextLinesCount: 5,
        handleUncaughtException: true
    }));
}

// Serve static files.. usually nginx will do that but for now
// it's ok like that
if (config.enviroment === constants.PROD) {
    app.use(express.static(constants.PROD_FOLDER));
} else {
    app.use(express.static(constants.DEV_FOLDER));
}

// Runs app
var server = app.listen(config.port, function() {
    console.log('App server listening on port ' + server.address().port);
});
