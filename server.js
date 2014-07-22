/* ================= REQUIRE MODULES ===================== */

var express      = require('express'),
    app          = express(),
    path         = require('path'),
    fs           = require('fs'),
    logger       = require('morgan'),
    mongoose     = require('mongoose'),
    uriUtil      = require('mongodb-uri');



/* ===================== CONFIGURATION ==================== */

var port = process.env.PORT || 9001;					                // Default port or port 9001
/*
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for
 * plenty of time in most operating environments.
 */

var options = {
    server: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive: 1,
            connectTimeoutMS : 30000
        }
    }
};

/*
 * Mongoose uses a different connection string format than MongoDB's standard.
 * Use the mongodb-uri library to help you convert from the standard format to
 * Mongoose's format.
 */

var mongodbUri = 'mongodb://jsgeekwise:swagwise@ds053139.mongolab.com:53139/jsgeekwise';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);
var conn = mongoose.connection;

mongoose.connect(mongooseUri, options);
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
    // Wait for the database connection to establish, then start the app.
    app.listen(port);
    console.log('The MEAN is served up at http://localhost:' + port);
});

/* ================= REGISTER MODULES ===================== */

app.use(logger('dev'));                                 		        // log every request to the console
app.use(express.static(path.join(__dirname, 'app')));		            // set the static files location

/* ======================== ROUTES ========================= */
/*========================= Models==========================*/
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
    if(~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

require('./routes.js')(app);                            		        // configure our routes, passing in app reference

/* =============== START APP (THIS GOES LAST) ============== */

exports = module.exports = app;                                         // expose app


