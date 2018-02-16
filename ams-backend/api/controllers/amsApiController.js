'use strict';

var Client = require('../models/Client');
var MetricValue = require('../models/MetricValue');
var Test = require('../models/Test');
var Iteration = require('../models/Iteration');
var Player = require('../models/Player');
var connection = require('../../db');
var sequelize =  connection.sequelize;
var async = require("async");






exports.create_metric_values = function (req, res) {

    var json_body = req.body;
    var text = '';
    var client_tag=0;
    var client_id="";
    var client_name= "";
    var client_version="";
    var iteraton_number = 0;

    var test_id=0;
    var iteration_id=0;

 
    iteraton_number=json_body.length - 1;
    


          

             client_id=json_body[0].browserId;
             client_name = json_body[0].browserName;
             client_version = json_body[0].browserVersion;

            
             Client.findOne({ where: {ClientID: json_body[0].browserId} }).then(client => {
              
               
              // Client Id already exists... 
               console.log("Client Found"+ client.id);
               // Add new Test into database  
                 Test.create({ client_id: client.id , player_id: 1})
                  .then(function (newTest) {
               
                    console.log("New Test ID:"+ newTest.dataValues.id);
                    test_id=newTest.dataValues.id;
                    // Add Iteration number to Iteratio table
                 
 
                  async.forEach(Object.keys(json_body), function(index, callback) {
                      
                      if(index>0){


                        Iteration.create({ test_id: test_id, iteration_number: index})
                        .then(function (newIteration) {

                        console.log("New Iteration ID:"+ newIteration.dataValues.id);
                        iteration_id=newIteration.dataValues.id;

                        


                        
                        var each_iteration_data = json_body[index];
                        //console.log("Item: " + JSON.stringify(each_iteration_data[index]));
                        //console.log("test_id: " + test_id);
                       

                         async.forEach(Object.keys(each_iteration_data), function(each_iteration_index, callback) {

                         console.log("test_id: " + test_id);
                         console.log("iteration_id: " + iteration_id);
                         console.log("each_iteration: " + each_iteration_data[each_iteration_index]);
                         
                         if(each_iteration_index=="manifestLoad"){

                           MetricValue.create({   metric_id: 3 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                          }
                          if(each_iteration_index=="streamInitialised"){
                           MetricValue.create({   metric_id: 4 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                           
                          } 
                           if(each_iteration_index=="playbackStartDelay"){
                           MetricValue.create({   metric_id: 1 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                           
                          }
                          if(each_iteration_index=="qualityChangeDelay"){
                           MetricValue.create({   metric_id: 5 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                           
                          }
                          if(each_iteration_index=="playbackSeekingDelay"){
                           MetricValue.create({   metric_id: 6 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                           
                          } 
                          if(each_iteration_index=="playbackRate"){
                           MetricValue.create({   metric_id: 9 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                           
                          }  
                          if(each_iteration_index=="bufferStableTime"){
                            MetricValue.create({   metric_id: 7 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                           
                          } 
                          if(each_iteration_index=="droppedFrames"){
                             MetricValue.create({   metric_id: 2 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                           
                          }       
                           
                          if(each_iteration_index=="bufferLevel"){

                              var buffer_level=each_iteration_data[each_iteration_index];
                             
                              async.forEach(Object.keys(buffer_level), function(each_buffer_index, callback) {

                                 //console.log("Buffer Level"+ buffer_level[each_buffer_index]);
                                  MetricValue.create({   metric_id: 8 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: buffer_level[each_buffer_index] });
                         


                                },function(err) {
                                //When done
                             })

                           
                          }   
                        
                          
                          
                           
                                                  

                         },function(err) {
                            //When done
                         })


                       })

                      }


                      
                   //Play around with the color and action
                  }, function(err) {
                      //When done
                  });


                    
 
                   

                 


      })   
               


              }).catch(function(err) {
                
                // Error if no Client ID found
                // Add new Client ID to database

                 
             Client.create({ ClientID: client_id , name: client_name, version: client_version })
                 .then(function (newClient) {
              

                 console.log("Data Values:"+ newClient.dataValues.id);
                      // Add new Test into database  
                       Test.create({ client_id: newClient.dataValues.id , player_id: 1})
                        .then(function (newTest) {
                     
                          console.log("New Test ID:"+ newTest.dataValues.id);
                          test_id=newTest.dataValues.id;
                          

                         async.forEach(Object.keys(json_body), function(index, callback) {

                             if(index>0){
                                

                                 Iteration.create({ test_id: newTest.dataValues.id , iteration_number: index})
                                    .then(function (newIteration) {

                                        console.log("New Iteration ID:"+ newIteration.dataValues.id);
                                        iteration_id=newIteration.dataValues.id;
                                        
                                       


                                var each_iteration_data = json_body[index];
                                async.forEach(Object.keys(each_iteration_data), function(each_iteration_index, callback) {

                                           console.log("test_id: " + test_id);
                                           console.log("each_iteration: " + each_iteration_data[each_iteration_index]);
                                           
                                           if(each_iteration_index=="manifestLoad"){

                                             MetricValue.create({   metric_id: 3 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                                            }
                                            if(each_iteration_index=="streamInitialised"){
                                             MetricValue.create({   metric_id: 4 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                                             
                                            } 
                                             if(each_iteration_index=="playbackStartDelay"){
                                             MetricValue.create({   metric_id: 1 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                                             
                                            }
                                            if(each_iteration_index=="qualityChangeDelay"){
                                             MetricValue.create({   metric_id: 5 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                                             
                                            }
                                            if(each_iteration_index=="playbackSeekingDelay"){
                                             MetricValue.create({   metric_id: 6 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                                             
                                            } 
                                            if(each_iteration_index=="playbackRate"){
                                             MetricValue.create({   metric_id: 9 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                                             
                                            }  
                                            if(each_iteration_index=="bufferStableTime"){
                                              MetricValue.create({   metric_id: 7 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                                             
                                            } 
                                            if(each_iteration_index=="droppedFrames"){
                                               MetricValue.create({   metric_id: 2 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: each_iteration_data[each_iteration_index] });
                                             
                                            }       
                                             
                                            if(each_iteration_index=="bufferLevel"){

                                                var buffer_level=each_iteration_data[each_iteration_index];
                                               
                                                async.forEach(Object.keys(buffer_level), function(each_buffer_index, callback) {

                                                   //console.log("Buffer Level"+ buffer_level[each_buffer_index]);
                                                    MetricValue.create({   metric_id: 8 ,  iteration_id: iteration_id ,   test_id: test_id , unit_id: 1, metric_values: buffer_level[each_buffer_index] });
                                           


                                                  },function(err) {
                                                  //When done
                                               })

                                             
                                            }   

                                          },function(err) {
                                              //When done
                                          })
                              

                               })
                             // end of index check
                             }



                         },function(err) {
                           //When done
                       }) 




               })


            })







              });  



           
      
    
    
    
    res.send(req.body);


};



