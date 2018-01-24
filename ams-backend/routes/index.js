var express = require('express');
var path = require('path');
var router = express.Router();

// var db = require('./db');
var db = require(process.cwd() + '/db');

/*
db.connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
});
*/

// var app=express();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


/* GET home page. */
router.get('/', function(req, res, next) {

     db.connection.query('SELECT * FROM library_metric', function(err, rows){

     	    console.log(JSON.stringify(rows, null, 4));
            res.render('index', {metrics : rows});
  })
   //        res.render('index', { title: 'Express' });
});




module.exports = router;
