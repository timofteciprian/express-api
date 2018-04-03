
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
      (async function query() {
        const request = new sql.Request();

        request.query('select title, author from books')
          .then((result) => {
            console.log('BOOKS', result);
            const myBooks = result.recordset;
            res.render(
              'bookListView',
              {
                nav,
                title: 'Library',
                books: myBooks,
              },
            );
          }).catch((error) => {
            console.log('ERROR AT SELECT QUERY:', error);
          });

      }())

      
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

