// var mysql = require('mysql');

//   var connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "taha@123",
//     database : 'PizzaOrder'
//   });
  
//   connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

const Sequelize = require('sequelize');
const sequelize = new Sequelize('PizzaOrder', 'root', 'taha@123', {
  host: 'localhost',
  dialect: 'mysql',

  define: {
    freezeTableName: true,
    raw: true 
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});


sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});




//   module.exports = connection;
   module.exports = {sequelize,Sequelize};
  