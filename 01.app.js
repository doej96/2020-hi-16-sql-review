const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');

const bookRouter = require('./routes/book-route')

app.listen(3001, () => {console.log('http://127.0.0.1:3001')});

app.set('veiw engine','pug');
app.set('veiws', path.join(__dirname, 'views'));
app.locals.pretty = true;

app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/book', bookRouter);

app.use((req, res)=> {
  res.send('<h3>Error 404</h3>')
})