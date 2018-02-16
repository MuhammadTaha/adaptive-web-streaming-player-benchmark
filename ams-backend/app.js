
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
cors = require('cors');

port = process.env.PORT || 4022 ;


app = express();


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

var ams_routes = require('./routes/amsRoutes');
ams_routes(app);

var routes = require('./routes/amsApiRoutes');
routes(app);



// catch 404 and forward to error handler

app.use(function(req, res, next) {
   var err = new Error('Not Found');
   err.status = 404;
   next(err);
    // console.log(req);
    // console.log(res);
    // console.log(next);


});

app.listen(port);
console.log('AMS RESTful API server started on: ' + port);