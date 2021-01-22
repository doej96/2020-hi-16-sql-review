"use strict";

var express = require('express');

var app = express();

var path = require('path');

var moment = require('moment');

var bookRouter = require('./routes/book-route');

app.listen(3001, function () {
  console.log('http://127.0.0.1:3001');
});
app.set('veiw engine', 'pug');
app.set('veiws', path.join(__dirname, 'views'));
app.locals.pretty = true;
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/', express["static"](path.join(__dirname, 'public')));
app.use('/book', bookRouter);
app.use(function (req, res) {
  res.send('<h3>Error 404</h3>');
});