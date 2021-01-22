"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../modules/mysql-conn'),
    connection = _require.connection; //도서 리스트


router.get('/', function (req, res) {
  var sql = 'SELECT * FROM city ORDER BY id ASC';

  var onQuery = function onQuery(err, r) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = r[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;
        v.wdate = moment().format('YYYY-MM-DD hh:mm');
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
});