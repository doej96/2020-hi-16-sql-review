"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../modules/mysql-conn'),
    connection = _require.connection;

var moment = require('moment'); //도서 리스트


router.get('/', function (req, res) {
  var sql = 'SELECT * FROM books ORDER BY id ASC';

  var onQuery = function onQuery(err, r) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = r[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;
        v.wdate = moment(v.wdate).format('YYYY-MM-DD hh:mm:ss');
        /* !!!! */
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    res.render('book/list', {
      file: 'book',
      data: r
    });
  };

  connection.query(sql, onQuery);
}); //도서 등록

router.get('/create', function (req, res) {
  res.render('book/create', {
    file: 'book'
  });
}); //도서 등록(저장)

router.post('/save', function (req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      writer = _req$body.writer,
      wdate = _req$body.wdate;
  var sql = 'INSERT INTO books SET name=?, writer=?, wdate=?';
  var value = [name, writer, new Date()];

  var onQuery = function onQuery(err, r) {
    console.log(err);
    res.redirect('/book');
  };

  connection.query(sql, value, onQuery);
}); //도서 삭제

router.get('/remove/:id', function (req, res) {
  var sql = 'DELETE FROM books WHERE id=' + req.params.id;

  var onQuery = function onQuery(err, r) {
    res.redirect('/book');
  };

  connection.query(sql, onQuery);
});
module.exports = router;