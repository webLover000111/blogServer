var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var index = require('./routes/index');
var users = require('./routes/users');
var logup = require('./routes/logup');
var logout = require('./routes/logout');
var login = require('./routes/login');
var passages = require('./routes/passages');
var passagesList = require('./routes/passagesList');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use('/', express.static(path.join(__dirname,'client')));
app.use(session({
    secret :  'secrect',
    resave : true,
    saveUninitialized: false,
    cookie : {
        maxAge : 3600*2,
    }
}));
app.use(serveStatic(path.join(__dirname, 'client/assets')));
app.use('/api', index);
app.use('/api/variety/', passagesList);
app.use('/users', users);
app.use('/api/logup',logup);
app.use('/api/logout',logout);
app.use('/api/login',login);
app.use('/api/passages',passages);
app.listen(8000, function () {
    console.log('start server sucessfully!!!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
