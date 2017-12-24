'use strict';
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// var autoIncrement = require('mongoose-auto-increment');
// var connection = mongoose.createConnection("mongodb://localhost/PizzaServiceDB");
// autoIncrement.initialize(connection);

var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;


// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('PizzaOrder', 'root', 'taha@123', {
//   host: 'localhost',
//   dialect: 'mysql',

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   },
// });
// var PizzaSchema = new Schema({
const Pizza =  sequelize.define('Pizza',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING,
    
  },
  size: {
    type: Sequelize.ENUM('Standard', 'Large'),
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
});

// PizzaSchema.plugin(autoIncrement.plugin,{model:"Pizza",field:"id"});
// module.exports = mongoose.model('Pizza', PizzaSchema);
module.exports = Pizza;
