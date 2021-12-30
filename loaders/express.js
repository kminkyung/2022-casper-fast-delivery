const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const logger = require('morgan');
const routes = require('../api');

module.exports = ({ app }) => {
  app.use(logger('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(session({
    secret: 'casper',
    resave: true,
    secure: false,
    saveUninitialized: false,
    store: new FileStore(),
  }));

  app.use('/', routes());

  /* 404 */
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    console.error(req.originUrl);
    next(err);
  })

  /* error handler */
  app.use((err, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    })
  });
}