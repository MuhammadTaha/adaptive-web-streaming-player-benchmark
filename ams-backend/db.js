var mysql = require('mysql');

exports.connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'ams-backend'
});

/*
exports.conn = connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
*/
