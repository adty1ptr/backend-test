var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/assets'));

// Module Router
const customerRouter = require('./app/customer/router')
const transactionRouter = require('./app/transaction/router')

app.use('/api', customerRouter);
app.use('/api', transactionRouter);

module.exports = app;
