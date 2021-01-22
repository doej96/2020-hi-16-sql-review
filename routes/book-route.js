const express = require('express');
const router = express.Router();
const { connection } = require('../modules/mysql-conn');
const moment = require('moment')

//도서 리스트
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM books ORDER BY id ASC';
  const onQuery = (err, r) => {
    for(let v of r) {
      v.wdate = moment(v.wdate).format('YYYY-MM-DD hh:mm:ss');  /* !!!! */
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
  const sql = 'INSERT INTO books SET name=?, writer=?, wdate=?';
  const value = [name, writer, new Date()]; /* !!! */
  const onQuery = (err, r) => {
    console.log(err);
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

// 도시 수정
// -수정하는 페이지
router.get('/update/:id', (req, res) => {
  const sql = 'SELECT * FROM books WHERE id='+req.params.id;
  const onQuery = (err, r) => {
    res.render('book/update', { file: 'book', r: r[0] })
  } 
  connection.query(sql, onQuery); 
});

// -수정하고 저장
router.post('/update', (req, res) => {
  const { name, writer, wdate, id } = req.body;
  const sql = 'UPDATE books SET name=?, writer=?, wdate=? WHERE id=?';
  const value = [name, writer, new Date(), id];
  const onQuery = (err, r) => {
    res.redirect('/book');
  }
  connection.query(sql, value, onQuery); 
})

module.exports = router;