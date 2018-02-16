'use strict';

var Client = require('../models/Client');
var MetricValue = require('../models/MetricValue');
var Test = require('../models/Test');
var connection = require('../../db');




exports.create_metric_values = function (req, res) {


    // var sample_json = '[{"browserId":"5e5829ba2a16038663358183bd054051","browserName":"Gecko","browserVersion":"5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36"},{"manifestLoad":1662,"streamInitialised":361,"playbackStartDelay":0,"qualityChangeDelay":0,"playbackSeekingDelay":0,"playbackRate":1,"bufferStableTime":12,"droppedFrames":0,"bufferLevel":[0,0,0,4.004,8.008],"memoryUsage":[]},{"manifestLoad":0,"streamInitialised":0,"playbackStartDelay":13525,"qualityChangeDelay":14675,"playbackSeekingDelay":25,"playbackRate":1,"bufferStableTime":12,"droppedFrames":0,"bufferLevel":[32.032,31.864,31.864,0,0,3.15,3.15,36.036,36.036,36.036,36.036],"memoryUsage":[]},{"manifestLoad":0,"streamInitialised":0,"playbackStartDelay":18894,"qualityChangeDelay":536,"playbackSeekingDelay":68,"playbackRate":1,"bufferStableTime":12,"droppedFrames":0,"bufferLevel":[36.036,36.036,1.087,1.087,1.087,1.087,1.087,0.724,0],"memoryUsage":[]}]' ;
    var json_body = req.body;
    var text = '';
    var client_tag=0;
    for (var i=0;  i<json_body.length; i++ ) {

           if(i==0){

             
            
             Client.findOne({ where: {ClientID: json_body[i].browserId} }).then(client => {
              // project will be the first entry of the Projects table with the title 'aProject' || null
               
               
               console.log("Client_tag"+ client.id);
               


              }).catch(function(err) {
                // print th error details
                // console.log(err);
                
                



                
            });      

             console.log("Client_tag"+ client_tag);
 
                 // Add data to test table 
/*                Test.create( client_id: request['client_id'] , player_id: 1)
                    .then(function (newTest) {

                    });*/

      
             // Add data to iterations table

            
              console.log("Got a response: ", json_body[i].browserId);

           }
           else{

            // Ádd data to metric_values tables 

            console.log("Got a response: ", json_body[i].manifestLoad);

           }

           
      
       }
    res.send(req.body);


};



