"use strict";

var mysql = require('mysql2');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'eunjeong',
  password: '000000',
  database: 'eunjeong'
});
module.exports = {
  mysql: mysql,
  connection: connection
};