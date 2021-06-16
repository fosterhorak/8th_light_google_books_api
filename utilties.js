// CONTROLLERS.........................................................................
const fetch = require('node-fetch');
const jokeURL = 'https://api.chucknorris.io/jokes/random?category=';
const categoriesURL = 'https://api.chucknorris.io/jokes/categories';

module.exports = {
    index
};

function index(req, res) {
    fetch(categoriesURL)
    .then(res => res.json())
    .then(categories => {
        if (req.query.category) {
            fetch(`${jokeURL}${req.query.category}`)
            .then(res => res.json())
            .then(joke => {
                res.render('index', {categories, category: req.query.category, joke: joke.value});
            });
        } else {
            res.render('index', {categories, joke: null, category: null});
    }   
    });
}


// ROUTES..............................................................................
var express = require('express');
var router = express.Router();
const chuckCtrl = require('../controllers/chuck');

/* GET home page. */
router.get('/', chuckCtrl.index);

module.exports = router;



// SERVER.js............................................................................
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;


const key = process.env.API_KEY;
const rootURL = ''
var logger = require('morgan');
// load secrets from .env file
require('dotenv').config();