'use strict';
// var mongoose = require('mongoose'),
// var Schema = mongoose.Schema,
var orderItem = require('./OrderItem');
var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;


const Order = sequelize.define('Order',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  totalPrice: {
    type: Sequelize.FLOAT,
  },
  recipient: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Order;

// module.exports = mongoose.model('Order', OrderSchema);