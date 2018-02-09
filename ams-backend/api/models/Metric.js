'use strict';

var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;

var Metric = sequelize.define('metrics',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING(40),
    allowNull: false,
  }
  
});
  
module.exports = Metric;