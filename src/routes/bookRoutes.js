
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

//const sql = require('mssql');
// const debug = require('debug')('app:bookRoutes');

function router(nav) {
  const { getIndex, getById, middleware } = bookController(nav);
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);


  bookRouter.route('/:id')
    .get(getById);
  return bookRouter;
}

module.exports = router;

