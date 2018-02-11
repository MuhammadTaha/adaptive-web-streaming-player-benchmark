'use strict';

var Client = require('../models/Client');
var MetricValue = require('../models/MetricValue');
var connection = require('../../db');

console.log("in API controller");
exports.create_bitrate = function (req, res) {

  var request = req.body;

   //console.log(request);    
   //res.status(500).send(req.body);

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
 // console.log("response function");


   // var request = res.body;

  //   console.log(res);
  // //
  //   console.log(req);
  // //
  //   res.status(200).send({error:0 , message : "Finished"});
    res.status(200).send(req.body);

   // console.log(request);

   //res.end(request[0]["manifestLoad"].toString());
  // res.status(500).send(request[0]["manifestLoad"].toString());

/*  if (request['id'])
    delete request['id'];*/
/*
  MetricValue.create(request)
    .then(function (newModel) {

      console.log(newModel.dataValues);
      if (newModel.dataValues) {
        var uri = req.protocol + '://' + req.get('host') + req.originalUrl;
        res.setHeader('Location', uri + "/" + newModel.dataValues.id);
        res.status(201).send("Inserted new PlaybackDelay.");
      } else {
        res.status(400).send("Invalid input.")
      }
    });

    */

    // return req.body;
    // res.send(request);
    // return;
};