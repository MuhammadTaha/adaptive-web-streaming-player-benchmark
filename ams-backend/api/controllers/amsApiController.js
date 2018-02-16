'use strict';

var Client = require('../models/Client');
var MetricValue = require('../models/MetricValue');
var Test = require('../models/Test');
var connection = require('../../db');




exports.create_metric_values = function (req, res) {


    var json_body = req.body;
    var text = '';
    for (var i=0;  i<json_body.length; i++ ) {

           if(i==0){

              console.log("Got a response: ", json_body[i].browserId);

           }
           else{

            console.log("Got a response: ", json_body[i].manifestLoad);

           }

           
      
       }
    res.send(req.body);


};