
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
const bookService = require('../services/goodreadsService');

//const sql = require('mssql');
// const debug = require('debug')('app:bookRoutes');

function router(nav) {
  const { getIndex, getById, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);


  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}

module.exports = router;

