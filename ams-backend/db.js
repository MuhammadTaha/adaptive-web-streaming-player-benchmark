// var mysql = require('mysql');

/*
exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'ams-backend'
});
*/

const Sequelize = require('sequelize');
const sequelize = new Sequelize('ams-backend', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',

  define: {
    freezeTableName: true,
    raw: true ,
    timestamps: false
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

/*
exports.conn = connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
*/
//   module.exports = connection;
   module.exports = {sequelize,Sequelize};