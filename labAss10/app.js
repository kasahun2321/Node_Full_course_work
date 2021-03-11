
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/students');
var lab9Router = require('./routes/Lab9');
var protectEmptyRouter = require('./routes/protectEmptyInsert');


var url = 'mongodb+srv://node_course:2300@sandbox.lgbrt.mongodb.net'

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, { useUnifiedTopology: true })
let connection;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', function (req, res, next) {
  if (!connection) {
    console.log('connecting to mongoDB')
    client.connect(function (err) {
      // connections = client.db('lab6');
      connection = client.db('lab8');
      req.db = connection
      next()
    })
  } else {
    req.db = connection;
    next()
  }

})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentRouter)
app.use('/lab9Solution', lab9Router)
app.use('/protectEmpty',protectEmptyRouter )



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


app.listen(3000)
