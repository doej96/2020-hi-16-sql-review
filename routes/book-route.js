const express = require('express');
const router = express.Router();
const { connection } = require('../modules/mysql-conn');
const moment = require('moment')

//도서 리스트
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM books ORDER BY id ASC';
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
  res.render('book/create', {file : 'book'});
})

//도서 등록(저장)
router.post('/save', (req, res) => {
  const { name, writer, wdate } = req.body;
  const sql = 'INSERT INTO books SET name=?, writer=? wdate=?';
  const value = [name, writer, wdate];
  const onQuery = (err, r) => {
    res.redirect('/book');
  }
  connection.query(sql, value, onQuery);
})

//도서 삭제
router.get('/remove/:id', (req, res) => {
  const sql = 'DELETE FROM books WHERE id='+req.params.id;
  const onQuery = (err, r) => {
    res.redirect('/book');
  }
  connection.query(sql, onQuery);
})

module.exports = router;