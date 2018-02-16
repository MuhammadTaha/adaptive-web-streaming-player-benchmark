const Sequelize = require('sequelize');
const sequelize = new Sequelize('ams-backend', 'root', 'taha@123', {
  host: 'localhost',
  dialect: 'mysql',
  //logging: false,
  logging: console.log,
    logging: function (str) {
        
        console.log(str);
  },
  define: {
    freezeTableName: true,
    raw: true ,
    timestamps: false,

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

module.exports = {sequelize,Sequelize};
