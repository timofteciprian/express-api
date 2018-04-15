const express = require('express');

const { MongoClient } = require('mongodb');

const adminRouter = express.Router();
const books = [
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    bookId: 656,
    read: false,
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    bookId: 24280,
    read: false,
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    read: false,
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    read: false,
  },
  {
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Niko',
    read: false,
  },
];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          console.log('Connected corectly to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          console.log(err.stack)
        }
        client.close();
      }());
    });
  return adminRouter;
}
module.exports = router;
