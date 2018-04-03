
const express = require('express');

const bookRouter = express.Router();
const sql = require('mssql');
// const debug = require('debug')('app:bookRoutes');

function router(nav) {
  const books = [
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

  bookRouter.route('/')
    .get((req, res) => {
      const request = new sql.Request();


      request.query('select * from books')
        .then((result) => {
          console.log('BOOKS', result);
          res.render(
            'bookListView',
            {
              nav,
              title: 'Library',
              books,
            },
          );
        }).catch((error) => {
          console.log('ERROR AT SELECT QUERY:', error);
        });
    });


  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      console.log('bookroute:', id, books[id], req.params)
      res.render('bookView', {
        nav,
        title: 'Library',
        book: books[id],
      });
    });
  return bookRouter;
}

module.exports = router;

