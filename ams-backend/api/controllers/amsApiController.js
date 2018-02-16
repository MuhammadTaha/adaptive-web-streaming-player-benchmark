'use strict';

var Client = require('../models/Client');
var MetricValue = require('../models/MetricValue');
var Test = require('../models/Test');
var connection = require('../../db');

console.log("in API controller");
exports.create_bitrate = function (req, res) {



  var request = req.body;

   //console.log(request);    
   res.status(500).send(req.body);

  if (request['id'])
    delete request['id'];

  Client.create(request)
    .then(function (newModel) {

      console.log(newModel.dataValues);
      if (newModel.dataValues) {
        var uri = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.setHeader('Location', uri + "/" + newModel.dataValues.id);
        res.status(201).send("Inserted new Bitrate.");
      } else {
        res.status(400).send("Invalid input.")
      }
    });
};

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