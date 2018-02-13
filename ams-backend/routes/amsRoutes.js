'use strict';

module.exports = function (app) {

    console.log("in controller");
    var ams_con = require('../controllers/amsController.js');

    console.log("in route");


    // ams Routes
    app.route('/units')
        .get(ams_con.list_all_units);


    app.route('/')
        .get(ams_con.list_all_metrices);


};