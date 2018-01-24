'use strict';

var Unit = require('../api/models/Unit');

var connection = require('../db');


exports.list_all_units = function (req, res) {

  var requestParams = req.params;
  if (requestParams) {
    var arr = [];
    Unit.findAll({ attributes: ['id','name'], raw: true }).then(result => {
      
         res.render('index', {metrics : result});
    });
  
  } else {
    res.status(404).send("No Units exists.");
  }
};

