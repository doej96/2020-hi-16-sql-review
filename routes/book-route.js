const express = require('express');
const router = express.Router();
const { connection } = require('../modules/mysql-conn');
const moment = require('moment')

//도서 리스트
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM city ORDER BY id ASC';
  const onQuery = (err, r) => {
    for(let v of r) {
      v.wdate = moment().format('YYYY-MM-DD hh:mm');
    }
    res.render('book/list', {file: 'book', data: r})
  }
  connection.query(sql, onQuery);
})

//도서 등록
router.get('/create', (req, res) => {
  res.render('city/create', {file : 'book'});
})

module.exports = router;