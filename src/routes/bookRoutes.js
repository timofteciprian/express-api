
const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const bookRouter = express.Router();
const sql = require('mssql');
// const debug = require('debug')('app:bookRoutes');

function router(nav) {
  bookRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('Connected corectly to server');

          const db = client.db(dbName);

          const col = await db.collection('books')
          const books = await col.find().toArray();
          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books
            },
          ); s
        } catch (err) {
          console.log(err.strack);
        }
        client.close();
      }());
    });


  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('Connected corectly to server');

          const db = client.db(dbName);

          const col = await db.collection('books')

          const book = await col.findOne({ _id: new ObjectID(id) });

          console.log(book);
          res.render('bookView', {
            nav,
            title: 'Library',
            book,
          });
        } catch (err) {
          console.log(err.strack);
        }
      }());
      
    });
  return bookRouter;
}

module.exports = router;

