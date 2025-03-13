const cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var authRouter = require('./routes/auth');
var petsRouter = require('./routes/pets');
var requestsRouter = require('./routes/requests');
var authenticate = require('./routes/middleware/authentication');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRouter);
app.use('/pets', petsRouter);
app.use('/users', usersRouter);

// app.use('/auth', authenticate, authRouter);
// app.use('/pets', authenticate, petsRouter);
// app.use('/requests', authenticate, requestsRouter);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
