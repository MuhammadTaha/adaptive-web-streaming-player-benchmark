'use strict';

var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;

var Iteration = sequelize.define('iterations',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  test_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  iteration_number: {
    type: Sequelize.BIGINT,
    allowNull: false,
  }
 
   
});
  

module.exports = Iteration;