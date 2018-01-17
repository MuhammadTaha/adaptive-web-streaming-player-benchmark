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

/* GET home page. */
router.get('/', function(req, res, next) {

     db.connection.query('SELECT * FROM library_metric', function(err, rows){

     	    console.log(JSON.stringify(rows, null, 4));
            res.render('index', {metrics : rows});
  })
   //        res.render('index', { title: 'Express' });
});




module.exports = router;
