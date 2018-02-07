'use strict';

module.exports = function (app) {

  console.log("in controller");
  var ams_con = require('../api/controllers/amsApiController.js');
  
  console.log("in route");
  

    // ams API Routes
  app.route('/metric_values')
      .post(ams_con.create_metric_values);
    


  };