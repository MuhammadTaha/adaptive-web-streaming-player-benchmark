'use strict';

var Bitrate = require('../models/Bitrate');
var PlaybackDelay = require('../models/PlaybackDelay');
var connection = require('../../db');


exports.create_bitrate = function (req, res) {

  var request = req.body;

   //console.log(request);    
   //res.status(500).send(req.body);

  if (request['id'])
    delete request['id'];

  Bitrate.create(request)
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

exports.create_playback_delay = function (req, res) {

  var request = req.body;

   //console.log(request);    
   //res.status(500).send(req.body);

  if (request['id'])
    delete request['id'];

  PlaybackDelay.create(request)
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
};