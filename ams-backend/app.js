
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

port = process.env.PORT || 4022,
/*var index = require('./routes/index');
var users = require('./routes/users');*/


// var db = require('./db');

/*db.connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
});*/

app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
//app.use(bodyParser);

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cookieParser());

/*
app.use(cookieParser());

*/

//app.use('/', index);
// app.use('/users', users);

/*app.get('/reports', function (req, res) {
  res.send('Hello World!')
});*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
<<<<<<< HEAD
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
=======
  // res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
  // res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Accept");
  // res.header("Content-Type", "*/*");
  // res.header("Accept", "*/*");
>>>>>>> 2ad752224af57b3b5d872ee1e20c4fb23f2ceef5
  next();
});







//
// app.use(express.static(path.join(__dirname, 'public')));
// var ams_routes = require('./routes/amsRoutes');
// ams_routes(app);

var routes = require('./routes/amsApiRoutes');
routes(app);



// catch 404 and forward to error handler

app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
    console.log(req);
    console.log(res);
    console.log(next);


});




// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



app.listen(port);

console.log('AMS RESTful API server started on: ' + port);