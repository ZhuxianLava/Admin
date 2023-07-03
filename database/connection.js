// database/connection.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'webdulich',
  port: 3306
});

// Kiểm tra connection
connection.connect(function (err) {
  if (err) {
    console.log('Kết nối đến cơ sở dữ liệu không thành công:', err);
  } else {
    console.log('Kết nối đến cơ sở dữ liệu thành công');
  }
});

module.exports = connection;
