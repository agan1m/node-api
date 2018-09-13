const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const passportConfig = require('./config/passport')(passport);
const jwt = require('jsonwebtoken');
const config = require('./config/index');
const database = require('./config/database')(mongoose, config);


const app = express();
//require('./passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(passport.initialize());

app.set('supersecret', config.secret);
app.use(function(req, res, next){
  if (req.is('text/*')) {
      req.text = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk){ req.text += chunk });
      req.on('end', next);
  } else {
      next();
  }
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
});
app.use('/api', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



/* app.use(function(req, res, next){
  if (req.is('text/*')) {
      req.text = '';
      req.setEncoding('utf8');
      req.on('data', function(chunk){ req.text += chunk });
      req.on('end', next);
  } else {
      next();
  }
}); */