'use strict';

module.exports = function (app) {

    console.log("in controller");
    var ams_con = require('../controllers/amsController.js');


  // ams Routes
 app.route('/')
      .get(ams_con.list_all_metrices);


};