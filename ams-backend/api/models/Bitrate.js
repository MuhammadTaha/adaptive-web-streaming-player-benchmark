'use strict';

var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;

var Bitrate = sequelize.define('bitrate',{
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
  session_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  unit_id: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
    value: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  }
   
});
  
module.exports = Bitrate;