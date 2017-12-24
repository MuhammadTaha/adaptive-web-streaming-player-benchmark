'use strict';
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema,
// SchemaTypes = mongoose.Schema.Types;
// Sequelize = require('sequelize');
// autoIncrement = require('mongoose-auto-increment');
var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;

var OrderItem = sequelize.define('OrderItem',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  orderId: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  pizzaId: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  
});

module.exports = OrderItem;

// var orderItem = mongoose.model('OrderItem', OrderItemSchema);
// OrderItemSchema.pre('save', function(next) {
//   var doc = this;
//   orderItem.findByIdAndUpdate({id: 'entityId'}, {$inc: { id: 1} }, function(error, counter)   {
//       if(error)
//           return next(error);
//       doc.testvalue = orderItem.seq;
//       next();
//   });
// });
// OrderItemSchema.plugin(autoIncrement.plugin,{model:"OrderItem",field:"id"});
// module.exports = mongoose.model('OrderItem', OrderItemSchema);