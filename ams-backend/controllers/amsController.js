'use strict';

var Unit = require('../api/models/Unit');
var MetricValue = require('../api/models/MetricValue');
var connection = require('../db');

var db = require("../db");
var sequelize = db.sequelize;


exports.list_all_metrices = function (req, res) {

  var requestParams = req.params;

  var max_test_id = null;
  var num_iterations = null;

  var manifest_iteration_num = [];
  var manifest_delay_graph = [];

  var playback_iteration_num = [];
  var playback_delay_graph = [];

  var dropped_frames_iteration_num = [];
  var dropped_frames_graph = [];

  var stream_initialization_iteration_num = [];
  var stream_initialization_graph = [];

  var qulity_change_iteration_num = [];
  var qulity_change_graph = [];

  var playback_seeking_iteration_num = [];
  var playback_seeking_graph = [];

  var buffer_stable_time_iteration_num = [];
  var buffer_stable_time_graph = [];

  var playback_rate_iteration_num = [];
  var playback_rate_graph = [];

  var buffer_level_avg_iteration_num = [];
  var buffer_level_avg_graph = [];

  var memory_usage_iteration_num = [];
  var memory_usage_graph = [];



  sequelize.query('select MAX(test_id) as db_max_test_id from iterations ', { type: sequelize.QueryTypes.SELECT }
  ).then(myTables => {

    myTables.forEach((myTables, index) => {

      max_test_id = myTables.db_max_test_id;
    sequelize.query('SELECT MAX(iteration_number) as iteration_number FROM iterations where test_id =' + max_test_id, { type: sequelize.QueryTypes.SELECT }
    ).then(data => {data.forEach((data, index) => {

            num_iterations = data.iteration_number;

            });
        });

    });

    // console.log(" Maximum Test ID :" + max_test_id);




        // console.log(" Maximum Test ID :" + max_test_id);

    // Metric Report: Manifest Load Delay
    sequelize.query('select  it.iteration_number as it_num,mv.metric_values as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=3 and mv.test_id = ? ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
    ).then(manifest_loading_delay => {


      manifest_loading_delay.forEach((manifest_loading_delay, index) => {

        manifest_iteration_num.push("Iteration:" + manifest_loading_delay.it_num);
        manifest_delay_graph.push(manifest_loading_delay.val);

     
         });



      // Metric Report: PlayBack Delay
      sequelize.query('select  it.iteration_number as it_num,mv.metric_values as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=1 and mv.test_id = ? ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
      ).then(playback_load_delay => {

        playback_load_delay.forEach((playback_load_delay, index) => {
          playback_iteration_num.push("Iteration:" + playback_load_delay.it_num);
          playback_delay_graph.push(playback_load_delay.val);

        });



        // Metric Report: Dropped Frames
        sequelize.query('select  it.iteration_number as it_num,mv.metric_values as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=2 and mv.test_id = ? ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
        ).then(dropped_frames => {

          dropped_frames.forEach((dropped_frames, index) => {
            dropped_frames_iteration_num.push("Iteration:" + dropped_frames.it_num);
            dropped_frames_graph.push(dropped_frames.val);

          });




          // Metric Report: Stream Initilization Delays
          sequelize.query('select  it.iteration_number as it_num,mv.metric_values as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=4 and mv.test_id = ? ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
          ).then(stream_initialization_delay => {

            stream_initialization_delay.forEach((stream_initialization_delay, index) => {
              stream_initialization_iteration_num.push("Iteration:" + stream_initialization_delay.it_num);
              stream_initialization_graph.push(stream_initialization_delay.val);

            });


            // Metric Report: Quality Change Delays
            sequelize.query('select  it.iteration_number as it_num,mv.metric_values as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=5 and mv.test_id = ? ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
            ).then(quality_change_delay => {

              quality_change_delay.forEach((quality_change_delay, index) => {
                qulity_change_iteration_num.push("Iteration:" + quality_change_delay.it_num);
                qulity_change_graph.push(quality_change_delay.val);

              });


              // Metric Report: Playback Seeking Delay
              sequelize.query('select  it.iteration_number as it_num,mv.metric_values as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=6 and mv.test_id = ? ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
              ).then(playback_seeking_delay => {

                playback_seeking_delay.forEach((playback_seeking_delay, index) => {
                  playback_seeking_iteration_num.push("Iteration:" + playback_seeking_delay.it_num);
                  playback_seeking_graph.push(playback_seeking_delay.val);

                });

                // Metric Report: Buffer Stable Time
                sequelize.query('select  it.iteration_number as it_num,mv.metric_values as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=7 and mv.test_id = ? ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
                ).then(buffer_stable_time => {

                  buffer_stable_time.forEach((buffer_stable_time, index) => {
                    buffer_stable_time_iteration_num.push("Iteration:" + buffer_stable_time.it_num);
                    buffer_stable_time_graph.push(buffer_stable_time.val);

                  });

                  // Metric Report: PlayBack Rate
                  sequelize.query('select  it.iteration_number as it_num,mv.metric_values as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=9 and mv.test_id = ? ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
                  ).then(playback_rate => {

                    playback_rate.forEach((playback_rate, index) => {
                      playback_rate_iteration_num.push("Iteration:" + playback_rate.it_num);
                      playback_rate_graph.push(playback_rate.val);

                    });


                    // Metric Report: Buffer Level
                    sequelize.query('select  it.iteration_number as it_num,avg(mv.metric_values) as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=8 and mv.test_id = ? group by mv.iteration_id ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
                    ).then(buffer_level_avg => {

                      buffer_level_avg.forEach((buffer_level_avg, index) => {
                        buffer_level_avg_iteration_num.push("Iteration:" + buffer_level_avg.it_num);
                        buffer_level_avg_graph.push(buffer_level_avg.val);
                        console.log(" Buffer Level Average :" + buffer_level_avg.val);
                        console.log(" Buffer Level Number :" + buffer_level_avg.it_num);
                      });

                        // // Metric Report: Memory Usage
                        // sequelize.query('select  it.iteration_number as it_num,mv.metric_values as val from metric_values as mv join iterations as it on mv.iteration_id = it.id where mv.metric_id=10 and mv.test_id = ? ', { replacements: [max_test_id], type: sequelize.QueryTypes.SELECT }
                        // ).then(memory_usage => {
                        //
                        //     memory_usage.forEach((memory_usage, index) => {
                        //     memory_usage_iteration_num.push("Iteration:" + memory_usage.it_num);
                        //     memory_usage_graph.push(memory_usage.val);
                        //
                        // });
                          res.render('index', {
                              test_id: max_test_id,
                              num_iterations:num_iterations,
                              manifest_delay_detail: manifest_loading_delay,
                              manifest_iteration_num: JSON.stringify(manifest_iteration_num),
                              manifest_delay_graph: JSON.stringify(manifest_delay_graph),
                              playback_delay_detail: playback_load_delay,
                              playback_iteration_num: JSON.stringify(playback_iteration_num),
                              playback_delay_graph: JSON.stringify(playback_delay_graph),
                              dropped_frames_detail: dropped_frames,
                              dropped_frames_iteration_num: JSON.stringify(dropped_frames_iteration_num),
                              dropped_frames_graph: JSON.stringify(dropped_frames_graph),
                              stream_initialization_delay_detail: stream_initialization_delay,
                              stream_initialization_iteration_num: JSON.stringify(stream_initialization_iteration_num),
                              stream_initialization_graph: JSON.stringify(stream_initialization_graph),
                              quality_change_delay_details: quality_change_delay,
                              qulity_change_iteration_num: JSON.stringify(qulity_change_iteration_num),
                              qulity_change_graph: JSON.stringify(qulity_change_graph),
                              playback_seeking_delay_details: playback_seeking_delay,
                              playback_seeking_iteration_num: JSON.stringify(playback_seeking_iteration_num),
                              playback_seeking_graph: JSON.stringify(playback_seeking_graph),
                              buffer_stable_time_details: buffer_stable_time,
                              buffer_stable_time_iteration_num: JSON.stringify(buffer_stable_time_iteration_num),
                              buffer_stable_time_graph: JSON.stringify(buffer_stable_time_graph),
                              playback_rate_details: playback_rate,
                              playback_rate_iteration_num: JSON.stringify(playback_rate_iteration_num),
                              playback_rate_graph: JSON.stringify(playback_rate_graph),
                              buffer_level_avg_details: buffer_level_avg,
                              buffer_level_avg_iteration_num: JSON.stringify(buffer_level_avg_iteration_num),
                              buffer_level_avg_graph: JSON.stringify(buffer_level_avg_graph),
                              // memory_usage_details: memory_usage,
                              // memory_usage_iteration_num: JSON.stringify(memory_usage_iteration_num),
                              // memory_usage_graph: JSON.stringify(memory_usage_graph),
                          });


                    });


                  });


                });



              });



            });



          });


        });


      });


    });

  });

};
