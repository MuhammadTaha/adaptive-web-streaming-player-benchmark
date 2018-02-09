'use strict';

var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;

var Player = sequelize.define('players',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING(30),
    allowNull: false,
    unique: true
  },
  version: {
    type: Sequelize.STRING(10),
    allowNull: false,
  }
 
   
});
  

module.exports = Player;