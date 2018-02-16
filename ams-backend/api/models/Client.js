'use strict';

var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;

var Client = sequelize.define('clients',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  ClientID: {
    type: Sequelize.STRING(40),
    allowNull: false,
    unique: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  version: {
    type: Sequelize.TEXT,
    allowNull: false,
  }
 
   
});
  

module.exports = Client;