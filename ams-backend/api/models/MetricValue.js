'use strict';

var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;

var MetricValue = sequelize.define('metric_values',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  
  metric_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  iteration_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    
  },
  test_id: {
  type: Sequelize.BIGINT,
  allowNull: false,
    
  },
  unit_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  metric_values: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  }
 
   
});
  

module.exports = MetricValue;