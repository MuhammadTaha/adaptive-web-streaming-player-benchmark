'use strict';

var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;

var Unit = sequelize.define('unit',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING(30),
    allowNull: false,
  }
   
});
  
module.exports = Unit;