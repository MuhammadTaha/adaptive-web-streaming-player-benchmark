'use strict';

module.exports = function (app) {

  console.log("in controller");
  var ams_con = require('../api/controllers/amsApiController.js');
  
  console.log("in route");
  

    // ams API Routes
  app.route('/bitrate')
      .post(ams_con.create_bitrate);


  }