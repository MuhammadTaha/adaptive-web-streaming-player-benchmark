'use strict';

var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;

var Test = sequelize.define('tests',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  client_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  player_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  }
 
   
});
  

module.exports = Test;