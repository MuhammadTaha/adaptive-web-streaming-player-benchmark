'use strict';

var Client = require('../models/Client');
var MetricValue = require('../models/MetricValue');
var connection = require('../../db');


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

  var request = req.body;
  //res.send("Hello");

  // console.log(request);   

   //res.send(request[0]["manifestLoad"].toString());
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

    //return req.body;
    res.send(request);
};