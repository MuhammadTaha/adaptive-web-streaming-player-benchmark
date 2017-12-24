'use strict';
// var mongoose = require('mongoose');
// autoIncrement = require('mongoose-auto-increment');
// var Schema = mongoose.Schema;

// var SchemaTypes = mongoose.Schema.Types;
var db = require("../../db");
var sequelize =  db.sequelize,
Sequelize =  db.Sequelize ;


const Topping = sequelize.define('Topping',{
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey:true,
    autoIncrement:true
  },
  pizzaId: {
    type: Sequelize.BIGINT,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }

});
// var connection = mongoose.createConnection("mongodb://localhost/PizzaServiceDB");

// autoIncrement.initialize(connection);


// ToppingSchema.plugin(autoIncrement.plugin, 'Topping');
// module.exports = mongoose.model('Topping', ToppingSchema);

module.exports = Topping;