'use strict';

var Bitrate = require('../models/Bitrate');
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
        res.status(201).send("Created new Bitrate.");
      } else {
        res.status(400).send("Invalid input.")
      }
    });
};