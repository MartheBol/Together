var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var configDB = require('./config/database.js');

var app = express();

/*ZELF GETYPT */
/*------------------------------------------*/
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
// passport config
//FOR PASSPORT!
app.use(session({secret: 'frontendbackendproject' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

mongoose.connect(configDB.url);
/*----------------------------------*/

// view engine setup
//app.set('views', path.join(__dirname, 'public/views'));
//app.set('view engine', 'jade');
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/users', users);

require('./config/passport')(passport);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
     //  res.status(err.status || 500);
     //  res.render('error', {
     //      message: err.message,
     //      error: err
     //  });
     res.send({message: err.message});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
   //res.status(err.status || 500);
   //res.render('error', {
   //    message: err.message,
  // //    error: {}
   //});
    res.send({message: err.message});
});


module.exports = app;
