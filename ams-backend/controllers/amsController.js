'use strict';

var Unit = require('../api/models/Unit');
var MetricValue = require('../api/models/MetricValue');
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


exports.list_all_playback_delay = function (req, res) {

  var requestParams = req.params;
  /*
  if (requestParams) {
    var sessionId = [];
    var playback_vals = [];
    var sData;

    MetricValue.findAll({ attributes: ['session_id','value'], raw: true }).then(result => {
      
         result.forEach((result, index) => {
           
            sData = "Session: " + result.session_id;
         	sessionId.push(sData);
         	playback_vals.push(result.value);
         
         });
         res.render('index', {playback_delays : result, session_vals: JSON.stringify(sessionId), playback_delay_time: JSON.stringify(playback_vals) });
    });
  
  } else {
    res.status(404).send("No Units exists.");
  }
  */
};



exports.list_all_metrices = function (req, res) {

  var requestParams = req.params;
  
  console.log("Passed Data:" + req);

  res.send("Home");
  
  if (requestParams) {
    
    var sessionId = [];
    var playback_vals = [];
    var sData;
    
    /*
    PlaybackDelay.findAll({ attributes: ['session_id','value'], raw: true }).then(result => {
      
         result.forEach((result, index) => {
           
            sData = "Session: " + result.session_id;
          sessionId.push(sData);
          playback_vals.push(result.value);
         
         });
         res.render('index', {playback_delays : result, session_vals: JSON.stringify(sessionId), playback_delay_time: JSON.stringify(playback_vals) });
   

    });

   */
  } else {
    res.status(404).send("No Units exists.");
  }
  
};
