var express = require('express'),

  app = express(),
  port = process.env.PORT || 3000,
  // mongoose = require('mongoose'),
  // autoIncrement = require('mongoose-auto-increment');

  // var connection = mongoose.createConnection("mongodb://localhost/PizzaServiceDB");
  // autoIncrement.initialize(connection);
  Pizza = require('./api/models/Pizza'),
  // Topping = require('./api/models/Topping'),
  // Order = require('./api/models/Order'),
  // OrderItem = require('./api/models/OrderItem'),

  bodyParser = require('body-parser');

  var db = require('./db');
  // var mysql = require('mysql');

  // var con = mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "taha@123",
  //   database : 'PizzaOrder'
  // });
  
  // con.connect(function(err) {
  //   if (err) throw err;
  //   console.log("Connected!");
  // });



// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/PizzaServiceDB');

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/pizzaRoutes');
routes(app);

app.listen(port);

console.log('Pizza Order Service RESTful API server started on: ' + port);
